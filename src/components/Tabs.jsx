export default function Tabs({ tabs, value, onChange }) {
  const index = Math.max(0, tabs.findIndex((tab) => tab.id === value))

  return (
    <div role="tablist" className="relative flex rounded-full bg-white p-1 shadow-card">
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-1 top-1 rounded-full bg-purple-500 shadow-button transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
        style={{ width: `calc((100% - 8px) / ${tabs.length})`, transform: `translateX(${index * 100}%)` }}
      />
      {tabs.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full text-label-md font-medium transition-colors duration-300 ${
              active ? 'text-white' : 'text-gray-600'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold transition-colors duration-300 ${
                  active ? 'bg-error-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
