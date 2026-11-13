import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, UserRound } from 'lucide-react'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { TextArea } from '../components/TextField'
import { selfieImage } from '../assets'
import { useData } from '../hooks/useData'

const stamp = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const h = d.getHours()
  const offset = -d.getTimezoneOffset() / 60
  const sign = offset >= 0 ? '+' : '-'
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)} ${p(h % 12 || 12)}:${p(d.getMinutes())}${h < 12 ? 'AM' : 'PM'} GMT ${sign}${p(Math.abs(Math.floor(offset)))}:${p(Math.round((Math.abs(offset) % 1) * 60))}`
}

export default function SelfieClockIn() {
  const navigate = useNavigate()
  const { clockIn } = useData()
  const [notes, setNotes] = useState('')
  const [doneOpen, setDoneOpen] = useState(false)
  const [takenAt, setTakenAt] = useState(stamp)
  const [flash, setFlash] = useState(0)

  const retake = () => {
    setFlash((n) => n + 1)
    setTakenAt(stamp())
  }

  const finish = () => {
    clockIn()
    navigate('/attendance', { replace: true })
  }

  return (
    <>
      <PageHeader title="Selfie To Clock In" />
      <Screen footer={<Button onClick={() => setDoneOpen(true)}>Clock In</Button>} className="p-3">
        <div className="animate-fade-up rounded-xl bg-white p-3 shadow-card">
          <div className="relative h-[440px] overflow-hidden rounded-xl bg-gray-800">
            <img src={selfieImage} alt="Your clock-in selfie" className="h-full w-full object-cover object-top" />
            {flash > 0 && <span key={flash} className="pointer-events-none absolute inset-0 animate-fade-out bg-white" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-16">
              <p className="text-label-md leading-5 text-white">
                Lat : 45.43534
                <br />
                Long : 97897.576
                <br />
                {takenAt}
              </p>
              <Button icon={RefreshCw} className="mt-3" onClick={retake}>
                Retake Photo
              </Button>
            </div>
          </div>

          <TextArea
            className="mt-3"
            label="Clock In Notes (Optional)"
            placeholder="Clock-in Notes"
            rows={5}
            value={notes}
            onChange={setNotes}
          />
        </div>
      </Screen>

      <ConfirmSheet
        open={doneOpen}
        icon={UserRound}
        title="Clock-In Successful!"
        message="You’re all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks."
        primary="Go To Clock In Page"
        onPrimary={finish}
      />
    </>
  )
}
