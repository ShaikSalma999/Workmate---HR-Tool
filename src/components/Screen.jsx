export default function Screen({ children, footer, className = '' }) {
  return (
    <>
      <div className={`no-scrollbar min-h-0 flex-1 overflow-y-auto ${className}`}>{children}</div>
      {footer && <div className="shrink-0 bg-white px-5 py-4 shadow-bar">{footer}</div>}
    </>
  )
}
