import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Briefcase, MapPin, RefreshCw, UserRound } from 'lucide-react'
import Button from '../components/Button'
import CalendarSheet from '../components/CalendarSheet'
import { Card, CardHeading } from '../components/Card'
import OptionSheet from '../components/OptionSheet'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { SelectField, TextArea, TextField } from '../components/TextField'
import { cities, countries, positions, states } from '../data/mock'
import { useAuth } from '../hooks/useAuth'
import { dayKey, formatLong } from '../utils/format'
import { userAvatar } from '../utils/user'

const parseDay = (key) => {
  if (!key) return null
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const lists = {
  position: { title: 'Position', subtitle: 'Select your position', options: positions },
  country: { title: 'Country', subtitle: 'Where do you live?', options: countries },
  state: { title: 'State', subtitle: 'Select your state', options: states },
  city: { title: 'City', subtitle: 'Select your city', options: cities },
}

export default function PersonalData() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    position: user.position,
    country: user.country,
    state: user.state,
    city: user.city,
    address: user.address,
    avatar: user.avatar,
  })
  const [sheet, setSheet] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))
  const birth = parseDay(form.birthDate)
  const picker = lists[sheet]
  const changed = Object.keys(form).some((key) => form[key] !== user[key])
  const valid = form.firstName.trim() && form.position

  return (
    <>
      <PageHeader title="Personal Data" />
      <Screen
        className="stagger space-y-3 p-3"
        footer={
          <Button disabled={!changed || !valid} onClick={() => setConfirmOpen(true)}>
            Update
          </Button>
        }
      >
        <Card className="space-y-3">
          <CardHeading title="My Personal Data" subtitle="Details about my personal data" />

          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                key={form.avatar}
                src={userAvatar(form)}
                alt="Profile"
                className="h-[88px] w-[88px] animate-pop-small rounded-xl border-2 border-white object-cover shadow-card"
              />
              <button
                type="button"
                aria-label="Change photo"
                onClick={() => set('avatar')(form.avatar === 'b' ? 'a' : 'b')}
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-purple-500 text-white ring-2 ring-white transition active:rotate-180"
              >
                <RefreshCw size={12} />
              </button>
            </div>
            <p className="mt-2 text-label-md font-medium text-gray-800">Upload Photo</p>
            <p className="text-center text-[10px] text-gray-500">Format should be in .jpeg .png atleast 800×800px and less than 5MB</p>
          </div>

          <TextField label="First Name" icon={UserRound} value={form.firstName} onChange={set('firstName')} placeholder="First name" />
          <TextField label="Last Name" icon={UserRound} value={form.lastName} onChange={set('lastName')} placeholder="Last name" />
          <SelectField
            label="Date of Birth"
            icon={Calendar}
            placeholder="Select date of birth"
            value={birth ? formatLong(birth) : ''}
            onClick={() => setSheet('birth')}
          />
          <SelectField label="Position" icon={Briefcase} placeholder="Select position" value={form.position} onClick={() => setSheet('position')} />
        </Card>

        <Card className="space-y-3">
          <CardHeading title="Address" subtitle="Your current domicile" />
          <SelectField label="Country" icon={MapPin} placeholder="Select country" value={form.country} onClick={() => setSheet('country')} />
          <SelectField label="State" icon={MapPin} placeholder="Select state" value={form.state} onClick={() => setSheet('state')} />
          <SelectField label="City" icon={MapPin} placeholder="Select city" value={form.city} onClick={() => setSheet('city')} />
          <TextArea label="Full Address" placeholder="Enter your full address" value={form.address} onChange={set('address')} />
        </Card>
      </Screen>

      <OptionSheet
        open={Boolean(picker)}
        title={picker?.title}
        subtitle={picker?.subtitle}
        options={picker?.options ?? []}
        value={form[sheet]}
        onClose={() => setSheet(null)}
        onConfirm={(value) => {
          set(sheet)(value)
          setSheet(null)
        }}
      />

      <CalendarSheet
        open={sheet === 'birth'}
        title="Date of Birth"
        subtitle="Select your date of birth"
        initialMonth={birth ?? new Date(1997, 11, 1)}
        value={birth ? { start: birth } : undefined}
        onClose={() => setSheet(null)}
        onConfirm={({ start }) => {
          set('birthDate')(dayKey(start))
          setSheet(null)
        }}
      />

      <ConfirmSheet
        open={confirmOpen}
        icon={UserRound}
        title="Update Profile"
        message="Are you sure you want to update your profile? This will help us improve your experience and provide personalized features."
        primary="Yes, Update Profile"
        secondary="No, Let me check"
        onPrimary={() => {
          updateProfile({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim() })
          setConfirmOpen(false)
          setDoneOpen(true)
        }}
        onSecondary={() => setConfirmOpen(false)}
      />

      <ConfirmSheet
        open={doneOpen}
        icon={UserRound}
        title="Profile Updated!"
        message="Your personal data has been saved."
        primary="Back To Profile"
        onPrimary={() => navigate('/profile')}
      />
    </>
  )
}
