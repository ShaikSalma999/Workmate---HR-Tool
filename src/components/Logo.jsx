export default function Logo({ size = 56 }) {
  return (
    <span
      className="grid place-items-center rounded-2xl border border-purple-400 bg-gradient-to-b from-purple-500 to-purple-600 shadow-button"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="5" height="18" rx="2.5" fill="white" />
        <rect x="21" y="5" width="5" height="18" rx="2.5" fill="white" />
        <rect x="11.5" y="2" width="5" height="24" rx="2.5" fill="white" />
        <rect x="7" y="12" width="14" height="4" fill="white" />
      </svg>
    </span>
  )
}
