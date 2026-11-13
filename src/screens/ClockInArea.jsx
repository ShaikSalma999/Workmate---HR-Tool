import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Loader2, MapPin } from 'lucide-react'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { Avatar } from '../components/Avatar'
import { illoClock, mapImage } from '../assets'
import { useAuth } from '../hooks/useAuth'
import { fullName } from '../utils/accounts'
import { formatLong } from '../utils/format'
import { userAvatar } from '../utils/user'

function ClockBox({ label, time }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 py-3 text-center">
      <p className="text-label-sm font-medium tracking-wide text-gray-600">{label}</p>
      <p className="text-title-lg font-bold text-ink">{time}</p>
    </div>
  )
}

export default function ClockInArea() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [locating, setLocating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLocating(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PageHeader title="Clock In Area" />
      <Screen
        footer={
          <Button disabled={locating} onClick={() => navigate('/attendance/selfie')}>
            Selfie To Clock In
          </Button>
        }
        className="bg-white"
      >
        <div className="relative">
          <img src={mapImage} alt="Map showing the clock-in area" className="h-[300px] w-full object-cover" />
          {locating && (
            <span className="pointer-events-none absolute inset-0 grid place-items-center">
              <span className="h-24 w-24 animate-ping rounded-full bg-purple-400/40" />
            </span>
          )}
        </div>

        <div className="stagger -mt-4 rounded-t-2xl bg-white px-3 pb-4 pt-3">
          <div
            className={`relative flex h-[66px] flex-col justify-center overflow-hidden rounded-xl px-4 transition-colors duration-500 ${
              locating ? 'bg-purple-300' : 'bg-purple-500'
            }`}
          >
            {locating ? (
              <p className="flex items-center gap-2 text-title-sm font-semibold text-white">
                <Loader2 size={16} className="animate-spin" />
                Checking your location…
              </p>
            ) : (
              <>
                <p className="animate-fade-up text-title-sm font-semibold text-white">You are in the clock-in area!</p>
                <p className="animate-fade-up text-label-md text-purple-100">Now you can press clock in in this area</p>
                <img src={illoClock} alt="" className="absolute right-3 top-2 h-12 w-auto animate-float-slow" />
              </>
            )}
          </div>

          <div>
            <p className="mt-4 text-label-sm font-semibold uppercase text-gray-700">My Profile</p>
            <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-25 p-3">
              <Avatar src={userAvatar(user)} size={56} className="rounded-lg" />
              <div>
                <p className="flex items-center gap-1 text-title-sm font-semibold text-ink">
                  {fullName(user)}
                  <BadgeCheck size={16} className="fill-purple-500 text-white" />
                </p>
                <p className="text-label-sm text-purple-500">{formatLong(new Date())}</p>
                <p className="mt-1 flex items-center gap-1 text-label-sm text-gray-700">
                  <MapPin size={12} className="text-purple-500" />
                  Lat 45.43534 Long 97897.576
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-4 text-label-sm font-semibold uppercase text-gray-700">Schedule</p>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <ClockBox label="CLOCK IN" time="09:00" />
              <ClockBox label="CLOCK OUT" time="05:00" />
            </div>
          </div>
        </div>
      </Screen>
    </>
  )
}
