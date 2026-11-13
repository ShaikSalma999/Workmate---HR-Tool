import { NavLink, useLocation } from 'react-router-dom'
import { CalendarCheck, ClipboardList, Home, Layers, Receipt } from 'lucide-react'

const tabs = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/expense', label: 'Expense', icon: Receipt },
  { to: '/leave', label: 'Leave', icon: Layers },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const active = Math.max(0, tabs.findIndex((tab) => pathname.startsWith(tab.to)))

  return (
    <nav className="relative shrink-0 bg-nav pb-[env(safe-area-inset-bottom)]">
      <ul className="relative grid h-[78px] grid-cols-5 items-start pt-4">
        {tabs.map(({ to, label, icon: Icon }, i) => (
          <li key={to} className="flex justify-center">
            <NavLink to={to} aria-label={label} className="grid h-8 w-12 place-items-center">
              <Icon
                size={24}
                strokeWidth={i === active ? 2.25 : 1.5}
                className={`transition-all duration-300 ${i === active ? '-translate-y-0.5 scale-110 text-white' : 'text-gray-300'}`}
              />
            </NavLink>
          </li>
        ))}
        <span
          aria-hidden="true"
          className="absolute top-[52px] h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
          style={{ left: `calc(${active * 20}% + 10% - 10px)` }}
        />
      </ul>
    </nav>
  )
}
