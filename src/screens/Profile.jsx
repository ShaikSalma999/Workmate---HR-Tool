import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  Banknote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code,
  Folder,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  RotateCcw,
  UserRound,
} from 'lucide-react'
import Button from '../components/Button'
import Screen from '../components/Screen'
import { ConfirmSheet, Sheet } from '../components/Sheet'
import StatusBar from '../components/StatusBar'
import { faqs } from '../data/mock'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { fullName } from '../utils/accounts'
import { userAvatar } from '../utils/user'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="px-3 text-label-md font-semibold uppercase text-ink">{title}</h2>
      <div className="mt-2 space-y-1 rounded-xl bg-gray-100/70 p-1">{children}</div>
    </section>
  )
}

function Row({ icon: Icon, label, onClick, danger = false, plain = false }) {
  const content = (
    <>
      <Icon size={18} className={danger ? 'text-error-500' : 'text-purple-500'} fill={danger ? 'none' : 'currentColor'} fillOpacity={0.25} />
      <span className="flex-1 text-left text-label-md text-gray-800">{label}</span>
      {!plain && <ChevronRight size={16} className="text-gray-400" />}
    </>
  )
  if (plain) return <div className="flex items-center gap-3 px-3 py-2.5">{content}</div>
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition active:bg-white">
      {content}
    </button>
  )
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-gray-200">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-2 p-3 text-left">
        <span className="text-label-md font-semibold text-gray-800">{question}</span>
        <ChevronDown size={16} className={`shrink-0 text-purple-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <p className="overflow-hidden px-3 text-label-md text-gray-600">
          <span className="block pb-3">{answer}</span>
        </p>
      </div>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { reset } = useData()
  const [sheet, setSheet] = useState(null) 

  const logout = () => {
    signOut()
    navigate('/sign-in', { replace: true })
  }

  const location = user.city ? `${user.city}${user.country ? `, ${user.country}` : ''}` : 'Add your address in Personal Data'

  return (
    <>
      <Screen className="bg-white">
        <header className="shrink-0 bg-purple-500">
          <StatusBar />
          <div className="relative flex h-11 items-center justify-center">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/home')}
              className="absolute left-3 grid h-8 w-8 place-items-center rounded-full bg-white text-purple-500 transition active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-title-md font-semibold text-white">My Profile</h1>
          </div>
          <div className="h-[44px]" />
        </header>

        <div className="relative -mt-4 rounded-t-3xl bg-white px-3 pb-6 pt-[78px]">
          <div className="absolute inset-x-0 -top-[56px] flex justify-center">
            <img
              src={userAvatar(user)}
              alt=""
              className="h-[114px] w-[114px] animate-pop-small rounded-xl border-2 border-white object-cover"
            />
          </div>

          <div className="text-center">
            <p className="flex items-center justify-center gap-1.5 text-title-md font-semibold text-ink">
              {fullName(user)}
              <BadgeCheck size={18} className="fill-purple-500 text-white" />
            </p>
            <p className="text-label-md font-medium text-purple-500">{user.position}</p>
          </div>

          <div className="stagger mt-5 space-y-4">
            <Section title="Contact">
              <Row icon={Mail} label={user.email} plain />
              <Row icon={MapPin} label={location} plain />
            </Section>

            <Section title="Account">
              <Row icon={UserRound} label="Personal Data" onClick={() => navigate('/profile/personal')} />
              <Row icon={Folder} label="Office Assets" onClick={() => navigate('/profile/assets')} />
              <Row icon={Banknote} label="Payroll & Tax" onClick={() => navigate('/profile/payroll')} />
            </Section>

            <Section title="Settings">
              <Row icon={KeyRound} label="Change Password" onClick={() => navigate('/profile/password')} />
              <Row icon={Code} label="Versioning" onClick={() => setSheet('version')} />
              <Row icon={CircleHelp} label="FAQ and Help" onClick={() => setSheet('faq')} />
              <Row icon={RotateCcw} label="Reset demo data" onClick={() => setSheet('reset')} />
              <Row icon={LogOut} label="Logout" danger onClick={() => setSheet('logout')} />
            </Section>
          </div>
        </div>
      </Screen>

      <ConfirmSheet
        open={sheet === 'logout'}
        icon={LogOut}
        title="Logout"
        message="Are you sure you want to log out of Work Mate? You can sign back in at any time."
        primary="Yes, Logout"
        secondary="No, Stay Signed In"
        onPrimary={logout}
        onSecondary={() => setSheet(null)}
      />

      <ConfirmSheet
        open={sheet === 'reset'}
        icon={RotateCcw}
        title="Reset demo data?"
        message="This clears the tasks, expenses, leave requests, clock-in history and chats saved on this device for your account. Your login is kept."
        primary="Yes, Reset"
        secondary="No, Keep My Data"
        onPrimary={() => {
          reset()
          setSheet('resetDone')
        }}
        onSecondary={() => setSheet(null)}
      />

      <ConfirmSheet
        open={sheet === 'resetDone'}
        icon={RotateCcw}
        title="Data Reset"
        message="Everything is back to the starting demo data."
        primary="Close Message"
        onPrimary={() => setSheet(null)}
      />

      <Sheet open={sheet === 'version'} onClose={() => setSheet(null)} icon={Code}>
        <h2 className="text-center text-title-lg font-semibold text-ink">Versioning</h2>
        <p className="mt-2 text-center text-label-md text-gray-600">Work Mate v1.0.0</p>
        <p className="text-center text-label-md text-gray-600">Built with React, Tailwind CSS and React Router.</p>
        <Button className="mt-5" onClick={() => setSheet(null)}>
          Close Message
        </Button>
      </Sheet>

      <Sheet open={sheet === 'faq'} onClose={() => setSheet(null)} icon={CircleHelp}>
        <h2 className="text-center text-title-lg font-semibold text-ink">FAQ and Help</h2>
        <div className="no-scrollbar mt-4 max-h-[360px] space-y-2 overflow-y-auto">
          {faqs.map(([question, answer]) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
        <Button className="mt-5" onClick={() => setSheet(null)}>
          Close Message
        </Button>
      </Sheet>
    </>
  )
}
