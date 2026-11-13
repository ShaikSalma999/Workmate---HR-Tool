import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Button from './Button'
import { Sheet } from './Sheet'

export default function OptionSheet({
  open,
  title,
  subtitle,
  options,
  value,
  onClose,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Select',
}) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (open) setDraft(value)
  }, [open, value])

  return (
    <Sheet open={open} onClose={onClose}>
      <h2 className="text-title-lg font-semibold text-ink">{title}</h2>
      <p className="text-label-md font-medium text-purple-500">{subtitle}</p>

      <ul className="no-scrollbar mt-4 max-h-[360px] space-y-2 overflow-y-auto">
        {options.map((option) => {
          const selected = option === draft
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => setDraft(option)}
                className={`flex h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-body-md text-gray-900 ${
                  selected ? 'border-purple-400 bg-purple-50' : 'border-gray-300 bg-white'
                }`}
              >
                {option}
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full border ${
                    selected ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-400'
                  }`}
                >
                  {selected && <Check size={12} strokeWidth={3} />}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button disabled={!draft} onClick={() => onConfirm(draft)}>
          {confirmLabel}
        </Button>
      </div>
    </Sheet>
  )
}
