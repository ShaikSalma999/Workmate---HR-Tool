export function Card({ className = '', children }) {
  return <section className={`rounded-xl bg-white p-3 shadow-card ${className}`}>{children}</section>
}

export function CountChip({ children }) {
  return (
    <span className="rounded bg-purple-100 px-1.5 text-label-sm font-semibold text-purple-600">{children}</span>
  )
}

export function CardHeading({ title, subtitle, count }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-title-sm font-semibold text-gray-900">{title}</h2>
        {count != null && <CountChip>{count}</CountChip>}
      </div>
      {subtitle && <p className="text-label-md text-gray-600">{subtitle}</p>}
    </div>
  )
}

export function StatBox({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center gap-1.5 text-label-md text-gray-600">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-title-lg text-gray-900">{value}</p>
    </div>
  )
}

export function Dot({ className }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${className}`} />
}
