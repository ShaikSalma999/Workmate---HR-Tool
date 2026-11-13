import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Layers, Tag, UserRound } from 'lucide-react'
import Button from '../components/Button'
import CalendarSheet from '../components/CalendarSheet'
import { Card, CardHeading } from '../components/Card'
import OptionSheet from '../components/OptionSheet'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { PhoneField, SelectField, TextArea } from '../components/TextField'
import { delegates, leaveCategories } from '../data/mock'
import { useData } from '../hooks/useData'
import { formatShort } from '../utils/dates'

export default function LeaveSubmit() {
  const navigate = useNavigate()
  const { submitLeave } = useData()
  const [category, setCategory] = useState('')
  const [range, setRange] = useState(null)
  const [delegate, setDelegate] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [sheet, setSheet] = useState(null) // 'category' | 'duration' | 'delegate'
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const ready = category && range && delegate && phone.trim() && description.trim()
  const duration = range ? `${formatShort(range.start)} - ${formatShort(range.end)}` : ''

  return (
    <>
      <PageHeader title="Submit Leave" />
      <Screen
        className="p-3"
        footer={
          <Button disabled={!ready} onClick={() => setConfirmOpen(true)}>
            Submit Now
          </Button>
        }
      >
        <Card className="animate-fade-up space-y-3">
          <CardHeading title="Fill Leave Information" subtitle="Information about leave details" />
          <SelectField label="Leave Category" icon={Tag} placeholder="Select Category" value={category} onClick={() => setSheet('category')} />
          <SelectField label="Leave Duration" icon={CalendarDays} placeholder="Select Duration" value={duration} onClick={() => setSheet('duration')} />
          <SelectField label="Task Delegation" icon={UserRound} placeholder="Select Member" value={delegate} onClick={() => setSheet('delegate')} />
          <PhoneField label="Emergency Contact During Leave Period" value={phone} onChange={setPhone} placeholder="+62 82150005000" />
          <TextArea label="Leave Description" placeholder="Enter Leave Description" value={description} onChange={setDescription} />
        </Card>
      </Screen>

      <OptionSheet
        open={sheet === 'category'}
        title="Leave Category"
        subtitle="Select Leave category"
        options={leaveCategories}
        value={category}
        cancelLabel="Close Message"
        confirmLabel="Submit Date"
        onClose={() => setSheet(null)}
        onConfirm={(value) => {
          setCategory(value)
          setSheet(null)
        }}
      />

      <OptionSheet
        open={sheet === 'delegate'}
        title="Select Task Delegation"
        subtitle="Who will cover your tasks"
        options={delegates}
        value={delegate}
        onClose={() => setSheet(null)}
        onConfirm={(value) => {
          setDelegate(value)
          setSheet(null)
        }}
      />

      <CalendarSheet
        open={sheet === 'duration'}
        mode="range"
        title="Leave Duration"
        subtitle="Select Leave Duration"
        value={range ?? undefined}
        onClose={() => setSheet(null)}
        onConfirm={(value) => {
          setRange(value)
          setSheet(null)
        }}
      />

      <ConfirmSheet
        open={confirmOpen}
        icon={Layers}
        title="Submit Leave"
        message="Double-check your leave details to ensure everything is correct. Do you want to proceed?"
        primary="Yes, Submit"
        secondary="No, Let me check"
        onPrimary={() => {
          submitLeave({ category, range })
          setConfirmOpen(false)
          setDoneOpen(true)
        }}
        onSecondary={() => setConfirmOpen(false)}
      />

      <ConfirmSheet
        open={doneOpen}
        icon={Layers}
        title="Leave Submitted!"
        message="Your leave request has been sent for review! Wait for HR to review your request."
        primary="View Leave History"
        onPrimary={() => navigate('/leave')}
      />
    </>
  )
}
