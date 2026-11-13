import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarCheck, Clock } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading, StatBox } from '../components/Card'
import PurpleHeader from '../components/PurpleHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { headerArt } from '../assets'
import { attendanceHistory } from '../data/mock'
import { useData, useNow, workedMs } from '../hooks/useData'
import { formatHM, formatHMS } from '../utils/format'

const PAY_PERIOD_BASE = 32 * 3600 * 1000
const WORK_DAY = 8 * 3600 * 1000

function HistoryItem({ entry }) {
  return (
    <Card>
      <div className="flex items-center gap-2 text-title-sm font-semibold text-gray-900">
        <CalendarCheck size={16} className="text-purple-500" />
        {entry.date}
      </div>
      <div className="mt-2 flex justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
        <div>
          <p className="text-label-md text-gray-600">Total Hours</p>
          <p className="text-title-md text-gray-900">{entry.hours}</p>
        </div>
        <div>
          <p className="text-label-md text-gray-600">Clock in &amp; Out</p>
          <p className="text-title-md text-gray-900">{entry.range}</p>
        </div>
      </div>
    </Card>
  )
}

function LiveBadge({ status, ms }) {
  if (status === 'break') {
    return (
      <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-warning-50 px-3 py-1 text-label-md font-medium text-warning-700">
        <span className="h-2 w-2 rounded-full bg-warning-500" />
        On break · {formatHMS(ms)} worked
      </span>
    )
  }
  return (
    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-success-50 px-3 py-1 text-label-md font-medium text-success-700">
      <span className="h-2 w-2 animate-pulse-ring rounded-full bg-success-500" />
      Working · {formatHMS(ms)}
    </span>
  )
}

export default function Attendance() {
  const navigate = useNavigate()
  const { data, startBreak, endBreak, clockOut } = useData()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const { attendance } = data
  const { status } = attendance
  const live = status === 'working' || status === 'break'
  const now = useNow(status === 'working')
  const worked = workedMs(attendance, now)
  const history = [...data.history, ...attendanceHistory]

  const confirmClockOut = () => {
    clockOut()
    setConfirmOpen(false)
    setDoneOpen(true)
  }

  return (
    <>
      <Screen>
        <PurpleHeader title="Let’s Clock-In!" subtitle="Don’t miss your clock in schedule" art={headerArt.clock} />

        <div className="stagger -mt-20 space-y-3 px-3 pb-4">
          <Card>
            <CardHeading title="Total Working Hour" subtitle="Paid Period 1 Sept 2024 - 30 Sept 2024" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <StatBox icon={<Clock size={14} className="text-gray-400" />} label="Today" value={`${formatHM(worked)} Hrs`} />
              <StatBox
                icon={<Clock size={14} className="text-gray-400" />}
                label="This Pay Period"
                value={`${formatHM(PAY_PERIOD_BASE + worked)} Hrs`}
              />
            </div>

            {live && <LiveBadge status={status} ms={worked} />}

            <div className="mt-3">
              {status === 'idle' && <Button onClick={() => navigate('/attendance/clock-in-area')}>Clock In</Button>}

              {live && (
                <div className="grid grid-cols-2 gap-3">
                  {status === 'working' ? (
                    <Button variant="outline" onClick={startBreak}>
                      Take A Break
                    </Button>
                  ) : (
                    <Button onClick={endBreak}>Back To Work</Button>
                  )}
                  <Button variant="dark" onClick={() => setConfirmOpen(true)}>
                    Clock Out
                  </Button>
                </div>
              )}

              {status === 'out' && <Button disabled>Clocked Out</Button>}
            </div>
          </Card>

          {history.map((entry) => (
            <HistoryItem key={entry.id ?? entry.date} entry={entry} />
          ))}
        </div>
      </Screen>

      <ConfirmSheet
        open={confirmOpen}
        icon={Clock}
        title="Confirm Clockout"
        message="Once you clock out, you won’t be able to edit this time. Please double-check your hours before proceeding."
        primary="Yes, Clock Out"
        secondary="No, Let me check"
        onPrimary={confirmClockOut}
        onSecondary={() => setConfirmOpen(false)}
      >
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatBox icon={<Clock size={14} className="text-gray-400" />} label="Today" value={`${formatHMS(worked)} Hrs`} />
          <StatBox
            icon={<Clock size={14} className="text-gray-400" />}
            label="Overtime"
            value={`${formatHMS(Math.max(0, worked - WORK_DAY))} Hrs`}
          />
        </div>
      </ConfirmSheet>

      <ConfirmSheet
        open={doneOpen}
        icon={Clock}
        title="Clockout Successful!"
        message="You’ve officially clocked out for the day. Thank you for your hard work! Time to relax and enjoy your break."
        primary="Close Message"
        onPrimary={() => setDoneOpen(false)}
      />
    </>
  )
}
