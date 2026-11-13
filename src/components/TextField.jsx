import { useState } from 'react'
import { Check, ChevronDown, CircleAlert, Eye, EyeOff } from 'lucide-react'

const shell =
  'flex w-full items-center gap-2 rounded-lg border border-purple-300 bg-white px-3 transition ' +
  'focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100'

const errorShell = 'border-error-500 focus-within:border-error-500 focus-within:ring-error-100'

export function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1 animate-fade-in text-label-md text-error-500">{children}</p>
}

const labelStyle = 'mb-1.5 block text-label-md font-medium text-gray-700'
const inputStyle = 'min-w-0 flex-1 bg-transparent text-body-md text-gray-900 outline-none placeholder:text-gray-400'

export function TextField({ label, icon: Icon, type = 'text', value, onChange, placeholder, className = '', error, ...rest }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <label className={`block ${className}`}>
      {label && <span className={labelStyle}>{label}</span>}
      <div className={`${shell} h-11 ${error ? `${errorShell} animate-shake` : ''}`}>
        {Icon && <Icon size={18} className={`shrink-0 ${error ? 'text-error-500' : 'text-purple-500'}`} />}
        <input
          type={isPassword && visible ? 'text' : type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={inputStyle}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
            className="text-purple-400"
          >
            {visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
        {error && !isPassword && <CircleAlert size={18} className="shrink-0 text-error-500" />}
      </div>
      <FieldError>{error}</FieldError>
    </label>
  )
}

export function SelectField({ label, icon: Icon, value, placeholder, onClick, className = '', error }) {
  return (
    <div className={className}>
      {label && <span className={labelStyle}>{label}</span>}
      <button type="button" onClick={onClick} className={`${shell} h-11 text-left ${error ? errorShell : ''}`}>
        {Icon && <Icon size={18} className="shrink-0 text-purple-500" />}
        <span className={`flex-1 truncate text-body-md ${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} className="shrink-0 text-purple-400" />
      </button>
      <FieldError>{error}</FieldError>
    </div>
  )
}

export function TextArea({ label, value, onChange, placeholder, rows = 4, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className={labelStyle}>{label}</span>}
      <div className={`${shell} items-start py-2.5`}>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`${inputStyle} w-full resize-none`}
        />
      </div>
    </label>
  )
}

export function PhoneField({ label, value, onChange, placeholder = '+62 821 0000 0000', className = '', error }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className={labelStyle}>{label}</span>}
      <div className={`${shell} h-11 ${error ? `${errorShell} animate-shake` : ''}`}>
        <span className="flex shrink-0 items-center gap-1 text-body-md text-gray-900">
          INA
          <ChevronDown size={16} className="text-purple-400" />
        </span>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={inputStyle}
        />
        {error && <CircleAlert size={18} className="shrink-0 text-error-500" />}
      </div>
      <FieldError>{error}</FieldError>
    </label>
  )
}

export function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-label-md text-gray-800">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded border border-purple-500 bg-white text-purple-500 peer-checked:bg-purple-50 peer-focus-visible:ring-4 peer-focus-visible:ring-purple-100 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <Check size={12} strokeWidth={3} />
      </span>
      {children}
    </label>
  )
}
