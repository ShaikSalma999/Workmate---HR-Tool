import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { avatarGreen, avatarOrange, avatarPeach, notifDoc } from '../assets'
import { createSeed, defaultTaskDetail, idleAttendance } from '../data/seed'
import { read, write } from '../utils/storage'
import { decodeAssets, encodeAssets } from '../utils/assetCodec'
import {
  dayKey,
  daysBetween,
  formatClock,
  formatDayMonth,
  formatDotTime,
  formatHMS,
  formatLong,
  formatShort,
} from '../utils/format'

const DataContext = createContext(null)
const keyFor = (userId) => `workmate.data.v1.${userId}`
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

const dueDays = { 'Very Easy (Less Than a Day)': 1, 'Easy (A Day)': 1, 'Moderate (3 Days)': 3, 'Intermediate (5 Days)': 5, 'Advanced (1 Week)': 7 }

function hydrate(userId) {
  const stored = userId ? read(keyFor(userId)) : null
  const state = { ...createSeed(), ...(stored ? decodeAssets(stored) : {}) }
 
  if (state.attendance?.date !== dayKey()) state.attendance = idleAttendance()
  return state
}

export function workedMs(attendance, at = Date.now()) {
  if (attendance.status === 'out') return attendance.workedMs
  if (!attendance.clockInAt) return 0
  const onBreak = attendance.status === 'break' && attendance.breakStartedAt ? at - attendance.breakStartedAt : 0
  return Math.max(0, at - attendance.clockInAt - attendance.breakMs - onBreak)
}

const withNotification = (state, { title, body, to = '/home', icon = notifDoc }) => ({
  ...state,
  notifications: [{ id: uid('n'), title, body, time: formatDotTime(), to, icon, read: false }, ...state.notifications],
})

const parseAssignee = (label) => {
  const [name, role] = label.split(' - ')
  return { name, role: role ?? 'Team Member', avatar: avatarOrange }
}

function buildActions(setData) {
  const update = (fn) => setData((prev) => fn(prev))

  return {
    
    clockIn: () =>
      update((s) => {
        const at = Date.now()
        return withNotification(
          { ...s, attendance: { ...idleAttendance(), status: 'working', clockInAt: at } },
          { title: 'Clock-in successful', body: `You clocked in at ${formatClock(at)}. Have a productive day!`, to: '/attendance' },
        )
      }),
    startBreak: () =>
      update((s) => ({ ...s, attendance: { ...s.attendance, status: 'break', breakStartedAt: Date.now() } })),
    endBreak: () =>
      update((s) => {
        const a = s.attendance
        return {
          ...s,
          attendance: { ...a, status: 'working', breakMs: a.breakMs + (Date.now() - a.breakStartedAt), breakStartedAt: null },
        }
      }),
    clockOut: () =>
      update((s) => {
        const at = Date.now()
        const worked = workedMs(s.attendance, at)
        const entry = {
          id: uid('h'),
          date: formatLong(at),
          hours: `${formatHMS(worked)} hrs`,
          range: `${formatClock(s.attendance.clockInAt)} — ${formatClock(at)}`,
        }
        return withNotification(
          {
            ...s,
            history: [entry, ...s.history],
            attendance: { ...s.attendance, status: 'out', breakStartedAt: null, workedMs: worked },
          },
          { title: 'Clockout successful', body: `You worked ${formatHMS(worked)} today. Time to relax!`, to: '/attendance' },
        )
      }),

    // ---- tasks ----
    addTask: ({ title, description, member, priority, difficulty, images }) =>
      update((s) => {
        const due = new Date(Date.now() + (dueDays[difficulty] ?? 1) * 86400000)
        const task = {
          id: uid('t'),
          title: title.trim(),
          status: 'To Do',
          priority,
          progress: 0,
          due: formatDayMonth(due),
          comments: 0,
          team: [avatarOrange, avatarGreen, avatarPeach],
          ...defaultTaskDetail,
          description: description.trim(),
          difficulty,
          assignee: parseAssignee(member),
          images: images.length ? images : defaultTaskDetail.images,
          created: `Created ${formatShort(Date.now())}`,
          commentsList: [],
        }
        return withNotification(
          { ...s, tasks: [task, ...s.tasks] },
          { title: 'Task has been created', body: `“${task.title}” was assigned to ${task.assignee.name}.`, to: `/tasks/${task.id}` },
        )
      }),
    setTaskStatus: (id, status) =>
      update((s) => ({
        ...s,
        tasks: s.tasks.map((t) => {
          if (t.id !== id) return t
          const progress = status === 'Done' ? 100 : status === 'To Do' ? 0 : t.progress > 0 && t.progress < 100 ? t.progress : 50
          return { ...t, status, progress }
        }),
      })),
    addTaskComment: (id, comment) =>
      update((s) => ({
        ...s,
        tasks: s.tasks.map((t) =>
          t.id === id ? { ...t, comments: t.comments + 1, commentsList: [...t.commentsList, { id: uid('c'), ...comment }] } : t,
        ),
      })),

      submitExpense: ({ category, date, amount }) =>
      update((s) => {
        const value = Number(amount) || 0
        const item = { id: uid('e'), date: formatLong(date), type: category, amount: `$${value}` }
        return withNotification(
          {
            ...s,
            expenses: { ...s.expenses, review: [item, ...s.expenses.review] },
            expenseSummary: {
              ...s.expenseSummary,
              review: s.expenseSummary.review + value,
              total: s.expenseSummary.total + value,
            },
          },
          { title: 'Expense submitted', body: `Your ${category} claim of $${value} is waiting for review.`, to: '/expense' },
        )
      }),
    submitLeave: ({ category, range }) =>
      update((s) => {
        const days = daysBetween(range.start, range.end)
        const item = {
          id: uid('l'),
          date: formatLong(Date.now()),
          range: `${formatDayMonth(range.start)} - ${formatDayMonth(range.end)}`,
          total: `${days} ${days === 1 ? 'Day' : 'Days'}`,
          category,
        }
        return withNotification(
          { ...s, leaves: { ...s.leaves, review: [item, ...s.leaves.review] } },
          { title: 'Leave request sent', body: `Your ${category} request (${item.range}) is waiting for HR review.`, to: '/leave' },
        )
      }),

  
    joinMeeting: (id) => update((s) => (s.joined.includes(id) ? s : { ...s, joined: [...s.joined, id] })),

    markNotificationRead: (id) =>
      update((s) => ({ ...s, notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
    markAllNotificationsRead: () =>
      update((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
    notify: (n) => update((s) => withNotification(s, n)),

    sendMessage: (contactId, content) =>
      update((s) => ({
        ...s,
        chats: { ...s.chats, [contactId]: [...(s.chats[contactId] ?? []), { id: uid('m'), from: 'me', ...content, time: formatDotTime() }] },
      })),
    receiveMessage: (contactId, text, seen) =>
      update((s) => ({
        ...s,
        chats: { ...s.chats, [contactId]: [...(s.chats[contactId] ?? []), { id: uid('m'), from: 'them', text, time: formatDotTime() }] },
        unread: seen ? s.unread : { ...s.unread, [contactId]: (s.unread[contactId] ?? 0) + 1 },
      })),
    markChatRead: (contactId) => update((s) => (s.unread[contactId] ? { ...s, unread: { ...s.unread, [contactId]: 0 } } : s)),

    reset: () => setData(createSeed()),
  }
}

export function DataProvider({ userId = null, children }) {
  const [store, setStore] = useState(() => ({ id: userId, data: hydrate(userId) }))

  let current = store
  if (store.id !== userId) {
    current = { id: userId, data: hydrate(userId) }
    setStore(current)
  }

  useEffect(() => {
    if (current.id) write(keyFor(current.id), encodeAssets(current.data))
  }, [current])

  const setData = useCallback(
    (next) => setStore((s) => ({ ...s, data: typeof next === 'function' ? next(s.data) : next })),
    [],
  )
  const actions = useMemo(() => buildActions(setData), [setData])
  const value = useMemo(() => ({ data: current.data, ...actions }), [current.data, actions])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used inside DataProvider')
  return context
}

export function useNow(active = true, interval = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return undefined
    const id = setInterval(() => setNow(Date.now()), interval)
    return () => clearInterval(id)
  }, [active, interval])
  return now
}
