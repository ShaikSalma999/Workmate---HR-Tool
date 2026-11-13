import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Camera, Mic, Paperclip, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { chatPhoto } from '../assets'
import { autoReplies, contacts } from '../data/mock'
import { useData } from '../hooks/useData'

function Bubble({ message }) {
  const mine = message.from === 'me'
  const shape = mine ? 'rounded-br-md bg-purple-500 text-white' : 'rounded-bl-md bg-white text-ink'

  if (message.image) {
    return (
      <div className={`flex animate-message-in ${mine ? 'justify-end' : 'justify-start'}`}>
        <img src={message.image} alt="Shared photo" className="h-[232px] w-[231px] rounded-2xl object-cover" />
      </div>
    )
  }

  return (
    <div className={`flex animate-message-in ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[78%] rounded-2xl px-3 py-2 ${shape}`}>
        <p className="text-body-md">{message.text}</p>
        <p className={`mt-1 text-right text-label-sm ${mine ? 'text-purple-100' : 'text-gray-500'}`}>{message.time}</p>
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex animate-message-in justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-gray-400" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, sendMessage, receiveMessage, markChatRead } = useData()
  const contact = contacts.find((c) => c.id === id)
  const messages = data.chats[id] ?? []
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const replyTimer = useRef(null)

  useEffect(() => {
    markChatRead(id)
  }, [id, messages.length, markChatRead])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, typing])

  useEffect(() => () => clearTimeout(replyTimer.current), [])

  if (!contact) {
    navigate('/messages', { replace: true })
    return null
  }

  const scheduleReply = () => {
    setTyping(true)
    clearTimeout(replyTimer.current)
    replyTimer.current = setTimeout(() => {
      setTyping(false)
      receiveMessage(id, autoReplies[Math.floor(Math.random() * autoReplies.length)], true)
    }, 1500)
  }

  const send = () => {
    const text = draft.trim()
    if (!text) return
    sendMessage(id, { text })
    setDraft('')
    scheduleReply()
  }

  const sendPhoto = () => {
    sendMessage(id, { image: chatPhoto })
    scheduleReply()
  }

  return (
    <>
      <PageHeader title={contact.name} onBack={() => navigate('/messages')} />

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {typing && <TypingBubble />}
        <div ref={endRef} />
      </div>

      <div className="flex shrink-0 items-center gap-3 bg-white p-3 pb-4">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl bg-gray-100 px-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            className="min-w-0 flex-1 bg-transparent text-body-md outline-none placeholder:text-gray-400"
          />
          <Paperclip size={18} className="text-gray-400" />
          <button type="button" aria-label="Send a photo" onClick={sendPhoto} className="text-gray-400 transition active:scale-90">
            <Camera size={18} />
          </button>
        </div>
        <button
          type="button"
          aria-label={draft.trim() ? 'Send message' : 'Voice message'}
          onClick={send}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-purple-500 text-white shadow-button transition active:scale-90"
        >
          <span key={draft.trim() ? 'send' : 'mic'} className="animate-pop-small">
            {draft.trim() ? <Send size={20} /> : <Mic size={20} />}
          </span>
        </button>
      </div>
    </>
  )
}
