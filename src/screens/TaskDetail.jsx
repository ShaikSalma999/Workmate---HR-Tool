import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, Send, Smile } from 'lucide-react'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import { PriorityChip } from '../components/Chip'
import OptionSheet from '../components/OptionSheet'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { userAvatar } from '../utils/user'

const statuses = ['To Do', 'In Progress', 'Done']
const statusStyle = {
  'To Do': 'bg-gray-500',
  'In Progress': 'bg-purple-500',
  Done: 'bg-success-500',
}

function Person({ name, role, avatar }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={avatar} size={32} />
      <div>
        <p className="text-label-md font-semibold text-gray-900">{name}</p>
        <p className="text-label-sm font-semibold text-purple-500">{role}</p>
      </div>
    </div>
  )
}

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data, setTaskStatus, addTaskComment } = useData()
  const task = data.tasks.find((t) => t.id === id)
  const [active, setActive] = useState(0)
  const [draft, setDraft] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)

  if (!task) {
    return (
      <>
        <PageHeader title="Task Details" onBack={() => navigate('/tasks')} />
        <p className="p-6 text-center text-label-md text-gray-500">This task no longer exists.</p>
      </>
    )
  }

  const sendComment = () => {
    const text = draft.trim()
    if (!text) return
    addTaskComment(task.id, {
      name: user.firstName,
      role: user.position,
      at: 'Just now',
      text,
      avatar: userAvatar(user),
    })
    setDraft('')
  }

  return (
    <>
      <PageHeader title="Task Details" onBack={() => navigate('/tasks')} />
      <Screen className="p-3">
        <Card className="animate-fade-up space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-title-sm font-semibold text-gray-900">{task.title}</h2>
              <p className="text-label-sm text-gray-600">{task.created}</p>
            </div>
            <button
              type="button"
              onClick={() => setStatusOpen(true)}
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-label-sm font-medium text-white transition-colors duration-300 active:scale-95 ${statusStyle[task.status]}`}
            >
              {task.status}
              <ChevronDown size={12} />
            </button>
          </div>

          <div>
            <img
              key={active}
              src={task.images[active]}
              alt="Task attachment"
              className="h-[230px] w-full animate-fade-in rounded-lg object-cover"
            />
            <div className="mt-2 flex gap-2">
              {task.images.map((src, i) =>
                i === active ? null : (
                  <button key={src} type="button" onClick={() => setActive(i)} className="overflow-hidden rounded-md transition active:scale-95">
                    <img src={src} alt="" className="h-[75px] w-[76px] object-cover" />
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-2.5">
            <p className="text-label-sm font-semibold text-gray-700">Description</p>
            <p className="mt-1 text-label-md leading-5 text-gray-700">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-gray-200 pb-4">
            <div>
              <p className="text-label-sm font-semibold text-gray-700">Priority</p>
              <div className="mt-1">
                <PriorityChip priority={task.priority} />
              </div>
            </div>
            <div>
              <p className="text-label-sm font-semibold text-gray-700">Difficulty</p>
              <p className="mt-2 flex items-center gap-1.5 text-label-sm text-gray-800">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-success-500 text-white">
                  <Smile size={12} />
                </span>
                {task.difficulty}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-label-sm font-semibold text-gray-700">Assignee</p>
            <Person {...task.assignee} />
          </div>

          <div>
            <p className="mb-2 text-label-sm font-semibold text-gray-700">Comment Section</p>
            {task.commentsList.length === 0 && (
              <p className="mb-2 text-label-md text-gray-500">No comments yet. Start the conversation!</p>
            )}
            <ul className="space-y-3">
              {task.commentsList.map((c) => (
                <li key={c.id} className="flex animate-message-in gap-2">
                  <Avatar src={c.avatar} size={32} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-label-md font-semibold text-gray-900">{c.name}</p>
                        <p className="text-label-sm font-semibold text-purple-500">{c.role}</p>
                      </div>
                      <span className="shrink-0 text-label-sm text-gray-500">{c.at}</span>
                    </div>
                    <p className="mt-1 text-label-md text-gray-700">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-2">
              <Avatar src={userAvatar(user)} size={32} />
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-25 p-1.5 pl-3">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendComment()}
                  placeholder="Write a comment..."
                  className="min-w-0 flex-1 bg-transparent text-label-md outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  aria-label="Send comment"
                  onClick={sendComment}
                  className={`grid h-8 w-8 place-items-center rounded-md text-white transition active:scale-90 ${draft.trim() ? 'bg-purple-500' : 'bg-gray-400'}`}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Screen>

      <OptionSheet
        open={statusOpen}
        title="Task Status"
        subtitle="Where is this task now?"
        options={statuses}
        value={task.status}
        confirmLabel="Update Status"
        onClose={() => setStatusOpen(false)}
        onConfirm={(status) => {
          setTaskStatus(task.id, status)
          setStatusOpen(false)
        }}
      />
    </>
  )
}
