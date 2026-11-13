import { CircleCheck, Flag } from 'lucide-react'

export function StatusChip({ status }) {
  if (status === 'Done') {
    return (
      <span className="inline-flex h-6 items-center gap-1 rounded-full bg-success-50 px-2.5 text-label-md font-medium text-success-700">
        <CircleCheck size={14} className="text-success-500" />
        Done
      </span>
    )
  }

  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-gray-100 px-2.5 text-label-md font-medium text-gray-600">
      <span className="h-2 w-2 rounded-full bg-gray-300" />
      {status}
    </span>
  )
}

const priorityStyle = {
  High: 'bg-error-500',
  Medium: 'bg-warning-500',
  Low: 'bg-success-500',
}

export function PriorityChip({ priority }) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-label-md font-medium text-white ${priorityStyle[priority]}`}
    >
      <Flag size={12} fill="currentColor" />
      {priority}
    </span>
  )
}

export function HealthChip({ level }) {
  const good = level === 'Good'
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-label-sm font-semibold text-white ${good ? 'bg-success-400' : 'bg-warning-500'}`}
    >
      {level}
    </span>
  )
}
