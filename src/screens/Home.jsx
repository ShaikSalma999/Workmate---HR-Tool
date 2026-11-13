import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Bell, Check, Clock, Loader2, MessageSquare, Video } from 'lucide-react'
import { Avatar, AvatarStack } from '../components/Avatar'
import Button from '../components/Button'
import { Card, CardHeading } from '../components/Card'
import Screen from '../components/Screen'
import StatusBar from '../components/StatusBar'
import TaskCard from '../components/TaskCard'
import { illoCamera } from '../assets'
import { meetings } from '../data/mock'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { fullName } from '../utils/accounts'
import { userAvatar } from '../utils/user'

function RoundButton({ icon: Icon, label, count, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative grid h-10 w-10 place-items-center rounded-full bg-purple-50 text-purple-500 transition active:scale-90"
    >
      <Icon size={18} fill="currentColor" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 animate-pop-small place-items-center rounded-full bg-error-500 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  )
}

function JoinButton({ joined, onJoin }) {
  const [joining, setJoining] = useState(false)

  if (joined) {
    return (
      <span className="inline-flex h-6 animate-pop-small items-center gap-1 rounded-full bg-success-50 px-3 text-label-sm font-medium text-success-700">
        <Check size={12} strokeWidth={3} />
        Joined
      </span>
    )
  }

  const join = () => {
    setJoining(true)
    setTimeout(() => {
      onJoin()
      setJoining(false)
    }, 900)
  }

  return (
    <Button size="sm" className="w-auto" disabled={joining} onClick={join}>
      {joining ? <Loader2 size={12} className="animate-spin" /> : null}
      {joining ? 'Joining' : 'Join Meet'}
    </Button>
  )
}

function MeetingItem({ meeting, joined, onJoin }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-500 text-white">
            <Video size={13} fill="currentColor" />
          </span>
          <h3 className="text-title-sm font-medium text-gray-900">{meeting.title}</h3>
        </div>
        <span className="flex items-center gap-1 text-label-sm text-gray-500">
          <Clock size={12} className="text-gray-400" />
          {meeting.time}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <AvatarStack avatars={meeting.people} extra={meeting.extra} />
        <JoinButton joined={joined} onJoin={onJoin} />
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data, joinMeeting } = useData()

  const unreadNotifications = data.notifications.filter((n) => !n.read).length
  const unreadMessages = Object.values(data.unread).reduce((sum, n) => sum + n, 0)
  const todayTask = data.tasks.find((t) => t.status !== 'Done')

  return (
    <>
      <header className="shrink-0 bg-white pb-3">
        <StatusBar />
        <div className="flex items-center gap-3 px-4">
          <button type="button" aria-label="Open profile" onClick={() => navigate('/profile')} className="transition active:scale-90">
            <Avatar src={userAvatar(user)} size={44} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-title-md font-semibold text-ink">
              <span className="truncate">{fullName(user)}</span>
              <BadgeCheck size={18} className="shrink-0 fill-purple-500 text-white" />
            </p>
            <p className="truncate text-label-sm font-semibold text-purple-500">{user.position}</p>
          </div>
          <RoundButton icon={MessageSquare} label="Messages" count={unreadMessages} onClick={() => navigate('/messages')} />
          <RoundButton icon={Bell} label="Notifications" count={unreadNotifications} onClick={() => navigate('/notifications')} />
        </div>
      </header>

      <Screen className="stagger space-y-3 px-3 pb-4 pt-3">
        <button
          type="button"
          onClick={() => navigate('/attendance')}
          className="relative block h-[87px] w-full overflow-hidden rounded-xl bg-purple-500 px-4 py-5 text-left transition active:scale-[0.98]"
        >
          <h2 className="text-title-md font-semibold text-white">My Work Summary</h2>
          <p className="text-label-md text-purple-100">Today task &amp; presence activity</p>
          <img src={illoCamera} alt="" className="absolute right-0 top-0 h-full w-auto animate-float-slow" />
        </button>

        <Card className="space-y-3">
          <CardHeading title="Today Meeting" subtitle="Your schedule for the day" count={meetings.length} />
          {meetings.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              meeting={meeting}
              joined={data.joined.includes(meeting.id)}
              onJoin={() => joinMeeting(meeting.id)}
            />
          ))}
        </Card>

        <Card className="space-y-3">
          <CardHeading title="Today Task" subtitle="The tasks assigned to you for today" count={todayTask ? 1 : 0} />
          {todayTask ? (
            <TaskCard task={todayTask} onClick={() => navigate(`/tasks/${todayTask.id}`)} />
          ) : (
            <p className="py-4 text-center text-label-md text-gray-500">All caught up. Nothing left for today!</p>
          )}
        </Card>
      </Screen>
    </>
  )
}
