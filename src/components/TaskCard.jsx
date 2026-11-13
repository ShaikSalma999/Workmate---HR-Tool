import { Calendar, MessageSquare, Zap } from 'lucide-react'
import { AvatarStack } from './Avatar'
import { PriorityChip, StatusChip } from './Chip'

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-white px-3 text-label-sm font-medium text-gray-600 shadow-card">
      <Icon size={12} className="text-gray-400" />
      {children}
    </span>
  )
}

export default function TaskCard({ task, onClick }) {
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      {...(onClick ? { type: 'button', onClick } : {})}
      className="block w-full rounded-xl border border-gray-100 bg-gray-25 p-3 text-left"
    >
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple-500 text-white">
          <Zap size={14} fill="currentColor" />
        </span>
        <h3 className="truncate text-title-sm font-medium text-gray-900">{task.title}</h3>
      </div>

      <div className="mt-2 flex gap-2">
        <StatusChip status={task.status} />
        <PriorityChip priority={task.priority} />
      </div>

      <div className="mt-3 h-1 rounded-full bg-gray-200">
        <div
          className="h-full origin-left animate-grow-x rounded-full bg-purple-500 transition-[width] duration-500"
          style={{ width: `${task.progress}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <AvatarStack avatars={task.team} />
        <div className="flex gap-2">
          <Pill icon={Calendar}>{task.due}</Pill>
          <Pill icon={MessageSquare}>{task.comments}</Pill>
        </div>
      </div>
    </Wrapper>
  )
}
