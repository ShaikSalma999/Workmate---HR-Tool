import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScanFace, Zap } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading } from '../components/Card'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { TextField } from '../components/TextField'
import { useAuth } from '../hooks/useAuth'

export default function ChangePassword() {
  const navigate = useNavigate()
  const { changePassword } = useAuth()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [attempt, setAttempt] = useState(0)
  const [done, setDone] = useState(false)

  const update = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = () => {
    const result = changePassword(form.current, form.next, form.confirm)
    if (!result.ok) {
      setErrors(result.errors)
      setAttempt((n) => n + 1)
      return
    }
    setDone(true)
  }

  return (
    <>
      <PageHeader title="Change Password" />
      <Screen
        className="p-3"
        footer={
          <Button disabled={!form.current || !form.next || !form.confirm} onClick={submit}>
            Update Password
          </Button>
        }
      >
        <Card className="animate-fade-up space-y-3">
          <CardHeading title="Change Password Form" subtitle="Fill information to change your password" />
          <TextField key={`c${attempt}`} label="Current Password" icon={ScanFace} type="password" placeholder="Current password" value={form.current} onChange={update('current')} error={errors.current} />
          <TextField key={`n${attempt}`} label="New Password" icon={ScanFace} type="password" placeholder="At least 8 characters" value={form.next} onChange={update('next')} error={errors.next} />
          <TextField key={`f${attempt}`} label="Confirm New Password" icon={ScanFace} type="password" placeholder="Repeat new password" value={form.confirm} onChange={update('confirm')} error={errors.confirm} />
        </Card>
      </Screen>

      <ConfirmSheet
        open={done}
        icon={Zap}
        title="Password Updated!"
        message="Congratulations! You have updated your password successfully. You can now access your account with your new password."
        primary="Back To Profile"
        onPrimary={() => navigate('/profile', { replace: true })}
      />
    </>
  )
}
