import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function TabLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <div key={pathname} className="flex min-h-0 flex-1 animate-fade-in flex-col">
        <Outlet />
      </div>
      <BottomNav />
    </>
  )
}
