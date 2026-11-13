import { CircleCheck, CircleX } from 'lucide-react'
import { Avatar } from './Avatar'
import { Card } from './Card'
import { avatarPeach } from '../assets'


export default function RequestCard({ icon: Icon, date, fields, outcome }) {
  const approved = outcome?.status === 'approved'

  return (
    <Card>
      <div className="flex items-center gap-2 text-title-sm font-semibold text-gray-900">
        <Icon size={18} className="text-purple-500" />
        {date}
      </div>

      <div className="mt-2 flex justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
        {fields.map((field, i) => (
          <div key={field.label} className={i > 0 ? 'text-left' : ''}>
            <p className="text-label-md text-gray-600">{field.label}</p>
            <p className="text-title-md text-gray-900">{field.value}</p>
          </div>
        ))}
      </div>

      {outcome && (
        <div className="mt-3 flex items-center justify-between text-label-md">
          <span className={`inline-flex items-center gap-1.5 ${approved ? 'text-success-600' : 'text-error-500'}`}>
            {approved ? <CircleCheck size={16} /> : <CircleX size={16} />}
            {outcome.text}
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-700">
            By
            <Avatar src={avatarPeach} size={20} />
            {outcome.by}
          </span>
        </div>
      )}
    </Card>
  )
}
