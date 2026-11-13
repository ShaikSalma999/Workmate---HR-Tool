import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { useData } from '../hooks/useData'

export default function Notifications() {
  const navigate = useNavigate()
  const { data, markNotificationRead, markAllNotificationsRead } = useData()
  const unread = data.notifications.filter((n) => !n.read).length

  const open = (notification) => {
    markNotificationRead(notification.id)
    navigate(notification.to)
  }

  return (
    <>
      <PageHeader title="Notifications" onBack={() => navigate('/home')} />
      <Screen className="bg-surface">
        {unread > 0 && (
          <div className="flex animate-fade-in justify-end bg-white px-4 pb-2">
            <button type="button" onClick={markAllNotificationsRead} className="text-label-md font-semibold text-purple-500">
              Mark all as read ({unread})
            </button>
          </div>
        )}

        <ul className="stagger bg-white">
          {data.notifications.map((n) => (
            <li key={n.id} className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => open(n)}
                className={`flex w-full gap-3 px-3 py-4 text-left transition-colors duration-500 active:bg-gray-50 ${n.read ? 'bg-white' : 'bg-purple-25'}`}
              >
                <img src={n.icon} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex items-center gap-2 text-title-sm font-semibold text-ink">
                      {n.title}
                      {!n.read && <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />}
                    </p>
                    <span className="shrink-0 text-label-md text-ink">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-label-md text-gray-500">{n.body}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {data.notifications.length === 0 && (
          <p className="p-8 text-center text-label-md text-gray-500">You’re all caught up.</p>
        )}
      </Screen>
    </>
  )
}
