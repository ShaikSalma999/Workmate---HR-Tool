import { useRef } from 'react'

export default function OtpInput({ value, onChange, length = 6, error }) {
  const refs = useRef([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const update = (index, char) => {
    const next = [...digits]
    next[index] = char
    onChange(next.join(''))
  }

  const handleChange = (index, raw) => {
    const char = raw.replace(/\D/g, '').slice(-1)
    update(index, char)
    if (char && index < length - 1) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus()
  }

  return (
    <div>
    <div className={`flex justify-between gap-2 ${error ? 'animate-shake' : ''}`}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={digit}
          inputMode="numeric"
          maxLength={1}
          placeholder="0"
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`h-[52px] w-11 rounded-lg border bg-gray-50 text-center text-headline-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:ring-4 ${
            error ? 'border-error-500 focus:ring-error-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'
          } ${digit ? 'animate-pop-small border-purple-300 bg-white' : ''}`}
        />
      ))}
    </div>
    {error && <p className="mt-2 animate-fade-in text-label-md text-error-500">{error}</p>}
    </div>
  )
}
