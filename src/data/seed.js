import { avatarOrange, avatarGreen, avatarPeach, taskMain, taskThumb1, taskThumb2 } from '../assets'
import {
  difficulties,
  expenseSummary,
  expenses,
  leaves,
  seedChats,
  seedNotifications,
  taskDetail,
  tasks,
} from './mock'
import { dayKey } from '../utils/format'

export const idleAttendance = () => ({
  date: dayKey(),
  status: 'idle', 
  clockInAt: null,
  breakStartedAt: null,
  breakMs: 0,
  workedMs: 0,
})

export const defaultTaskDetail = {
  description: taskDetail.description,
  difficulty: taskDetail.difficulty,
  assignee: taskDetail.assignee,
  images: [taskMain, taskThumb1, taskThumb2],
  created: taskDetail.created,
  commentsList: taskDetail.comments,
}

export function createSeed() {
  return {
    tasks: tasks.map((t) => ({ ...t, id: String(t.id), ...defaultTaskDetail })),
    todoBase: 5,
    expenses,
    expenseSummary: {
      total: parseInt(expenseSummary.total.slice(1), 10),
      review: parseInt(expenseSummary.review.slice(1), 10),
      approved: parseInt(expenseSummary.approved.slice(1), 10),
    },
    leaves,
    attendance: idleAttendance(),
    history: [],
    notifications: seedNotifications,
    chats: seedChats,
    unread: { alicia: 1 },
    joined: [],
  }
}

export { avatarOrange, avatarGreen, avatarPeach, difficulties }
