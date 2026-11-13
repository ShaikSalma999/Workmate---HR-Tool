import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import { Sheet } from './Sheet'
import { sameDay } from '../utils/dates'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function buildMonth(year, month) {
  const lead = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()
  const cells = []

  for (let i = lead; i > 0; i--) cells.push({ date: new Date(year, month, 1 - i), outside: true })
  for (let d = 1; d <= total; d++) cells.push({ date: new Date(year, month, d) })
  while (cells.length % 7) {
    cells.push({ date: new Date(year, month + 1, cells.length - lead - total + 1), outside: true })
  }
  return cells
}

export default function CalendarSheet({
  open,
  mode = 'single',
  title,
  subtitle,
  initialMonth = new Date(2024, 10, 1),
  value,
  onClose,
  onConfirm,
}) {
  const [month, setMonth] = useState(initialMonth)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  useEffect(() => {
    if (!open) return
    setStart(value?.start ?? null)
    setEnd(value?.end ?? null)
  }, [open, value?.start, value?.end])

  const pick = (date) => {
    if (mode === 'single') return setStart(date)
    if (!start || end) {
      setStart(date)
      setEnd(null)
    } else if (date < start) {
      setStart(date)
    } else {
      setEnd(date)
    }
  }

  const shift = (step) => setMonth(new Date(month.getFullYear(), month.getMonth() + step, 1))
  const cells = buildMonth(month.getFullYear(), month.getMonth())
  const ready = mode === 'single' ? Boolean(start) : Boolean(start && end)

  return (
    <Sheet open={open} onClose={onClose}>
      <h2 className="text-title-lg font-semibold text-ink">{title}</h2>
      <p className="text-label-md font-medium text-purple-500">{subtitle}</p>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="p-1 text-purple-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-title-sm font-semibold text-ink">
          {month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button type="button" aria-label="Next month" onClick={() => shift(1)} className="p-1 text-purple-500">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <span key={day} className="rounded bg-gray-100 py-1.5 text-label-md font-medium text-gray-700">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 text-center">
        {cells.map(({ date, outside }) => {
          const isStart = start && sameDay(date, start)
          const isEnd = end && sameDay(date, end)
          const inRange = start && end && date > start && date < end
          const strip = inRange || (isStart && end) || isEnd
          const stripShape = isStart ? 'rounded-l-full' : isEnd ? 'rounded-r-full' : ''

          return (
            <div key={date.toISOString()} className={`py-0.5 ${strip ? `bg-purple-100 ${stripShape}` : ''}`}>
              <button
                type="button"
                onClick={() => pick(date)}
                className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-body-md ${
                  isStart || isEnd
                    ? 'bg-purple-600 font-semibold text-white'
                    : outside
                      ? 'text-gray-300'
                      : 'text-gray-800'
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-5 space-y-3">
        <Button disabled={!ready} onClick={() => onConfirm({ start, end })}>
          Submit Date
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close Message
        </Button>
      </div>
    </Sheet>
  )
}
