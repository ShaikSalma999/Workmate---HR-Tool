import { useNavigate } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { contacts } from '../data/mock'
import { useData } from '../hooks/useData'

export default function Messages() {
  const navigate = useNavigate()
  const { data } = useData()

  return (
    <>
      <PageHeader title="Messages" onBack={() => navigate('/home')} />
      <Screen className="bg-white">
        <ul className="stagger divide-y divide-gray-100">
          {contacts.map((contact) => {
            const chat = data.chats[contact.id] ?? []
            const last = chat[chat.length - 1]
            const unread = data.unread[contact.id] ?? 0

            return (
              <li key={contact.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/messages/${contact.id}`)}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left transition active:bg-gray-50"
                >
                  <Avatar src={contact.avatar} size={48} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-title-sm font-semibold text-ink">{contact.name}</p>
                      <span className="text-label-md font-medium text-ink">{last?.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-label-md ${unread ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                        {last ? `${last.from === 'me' ? 'You: ' : ''}${last.text ?? 'Sent a photo'}` : 'Say hi 👋'}
                      </p>
                      {unread > 0 && (
                        <span className="grid h-5 min-w-5 shrink-0 animate-pop-small place-items-center rounded-full bg-error-500 px-1 text-[11px] font-semibold text-white">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </Screen>
    </>
  )
}
