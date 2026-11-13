import { useEffect, useRef, useState } from 'react'
import Button from './Button'

export function Sheet({ open, onClose, icon: Icon, children, className = '' }) {
  const [mounted, setMounted] = useState(open)
  const [closing, setClosing] = useState(false)
  const lastChildren = useRef(children)
  if (open) lastChildren.current = children

  useEffect(() => {
    if (open) {
      setMounted(true)
      setClosing(false)
      return undefined
    }
    if (!mounted) return undefined
    setClosing(true)
    const timer = setTimeout(() => {
      setMounted(false)
      setClosing(false)
    }, 220)
    return () => clearTimeout(timer)

  }, [open])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/50 backdrop-blur-[3px] ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
      />
      <div
        className={`relative w-full rounded-t-[28px] bg-white px-5 pb-6 ${Icon ? 'pt-14' : 'pt-6'} ${
          closing ? 'animate-sheet-down' : 'animate-sheet-up'
        } ${className}`}
      >
        {Icon && (
          <span className="absolute -top-8 left-1/2 grid h-16 w-16 animate-pop place-items-center rounded-2xl border border-purple-400 bg-purple-500 text-white shadow-badge">
            <Icon size={30} />
          </span>
        )}
        {lastChildren.current}
      </div>
    </div>
  )
}

export function ConfirmSheet({ open, icon, title, message, children, primary, secondary, onPrimary, onSecondary, onClose }) {
  return (
    <Sheet open={open} onClose={onClose ?? onSecondary} icon={icon}>
      <h2 className="text-center text-title-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-label-md text-gray-600">{message}</p>
      {children}
      <div className="mt-5 space-y-3">
        <Button onClick={onPrimary}>{primary}</Button>
        {secondary && (
          <Button variant="outline" onClick={onSecondary}>
            {secondary}
          </Button>
        )}
      </div>
    </Sheet>
  )
}
