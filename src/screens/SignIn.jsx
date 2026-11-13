import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, Loader2, Mail, Phone, ScanFace, UserRound } from 'lucide-react'
import AuthBackdrop from '../components/AuthBackdrop'
import Button from '../components/Button'
import OtpInput from '../components/OtpInput'
import { ConfirmSheet } from '../components/Sheet'
import { Checkbox, PhoneField, TextField } from '../components/TextField'
import { useAuth } from '../hooks/useAuth'
import { DEMO_CODE, checkCredentials, demoAccount } from '../utils/accounts'

const methods = {
  email: { label: 'Sign in With Email', icon: Mail },
  employee: { label: 'Sign in With Employee ID', icon: UserRound },
  phone: { label: 'Sign in With Phone', icon: Phone },
}

const alternatives = {
  email: ['employee', 'phone'],
  employee: ['email', 'phone'],
  phone: ['employee', 'email'],
}

const identifierKey = { email: 'email', employee: 'employeeId', phone: 'phone' }

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [method, setMethod] = useState('email')
  const [form, setForm] = useState({ email: '', employeeId: '', phone: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState({})
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(null) // account waiting for its phone code
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')

  const update = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors({})
  }

  const switchMethod = (next) => {
    setMethod(next)
    setErrors({})
  }

  const finish = (account) => {
    signIn(account, remember)
    navigate('/home', { replace: true })
  }

  const submit = () => {
    const result = checkCredentials(method, form[identifierKey[method]], form.password)
    if (!result.ok) {
      setErrors({ [result.field]: result.message })
      setAttempt((n) => n + 1)
      return
    }

    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (method === 'phone') {
        setPending(result.account)
        setCode('')
        setCodeError('')
      } else {
        finish(result.account)
      }
    }, 700)
  }

  const verifyCode = () => {
    if (code !== DEMO_CODE) {
      setCodeError('That code isn’t right. Try again.')
      return
    }
    finish(pending)
  }

  const useDemo = () => {
    setMethod('email')
    setForm((f) => ({ ...f, email: demoAccount.email, password: demoAccount.password }))
    setErrors({})
  }

  return (
    <AuthBackdrop>
      <div className="relative animate-sheet-up rounded-t-[32px] bg-white px-[30px] pb-8 pt-6">
        <h1 className="text-center text-headline-sm font-semibold text-ink">Sign In</h1>
        <p className="text-center text-title-sm font-semibold text-gray-600">Sign in to my account</p>

        <div key={method} className="mt-5 animate-fade-up space-y-3">
          {method === 'email' && (
            <TextField
              key={`email-${attempt}`}
              label="Email"
              icon={Mail}
              type="email"
              placeholder="My Email"
              value={form.email}
              onChange={update('email')}
              error={errors.identifier}
            />
          )}
          {method === 'employee' && (
            <TextField
              key={`employee-${attempt}`}
              label="Employee ID"
              icon={BadgeCheck}
              placeholder="My Employee ID"
              value={form.employeeId}
              onChange={update('employeeId')}
              error={errors.identifier}
            />
          )}
          {method === 'phone' && (
            <PhoneField key={`phone-${attempt}`} label="Phone Number" value={form.phone} onChange={update('phone')} error={errors.identifier} />
          )}

          {method !== 'phone' && (
            <TextField
              key={`password-${attempt}`}
              label="Password"
              icon={ScanFace}
              type="password"
              placeholder="My Password"
              value={form.password}
              onChange={update('password')}
              error={errors.password}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Checkbox checked={remember} onChange={setRemember}>
            Remember Me
          </Checkbox>
          <Link to="/forgot-password" className="text-label-md font-medium text-purple-500">
            Forgot Password
          </Link>
        </div>

        <Button className="mt-4" onClick={submit} disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
        </Button>

        <div className="my-4 flex items-center gap-3 text-label-md text-gray-500">
          <span className="h-px flex-1 bg-gray-300" />
          OR
          <span className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="space-y-3">
          {alternatives[method].map((key) => (
            <Button key={key} variant="outline" icon={methods[key].icon} onClick={() => switchMethod(key)}>
              {methods[key].label}
            </Button>
          ))}
        </div>

        <p className="mt-4 text-center text-label-md text-ink">
          Don’t have an account?{' '}
          <Link to="/sign-up" className="font-medium text-purple-500">
            Sign Up Here
          </Link>
        </p>
        <button type="button" onClick={useDemo} className="mx-auto mt-2 block text-label-sm text-gray-400 underline">
          Fill in the demo account
        </button>
      </div>

      <ConfirmSheet
        open={Boolean(pending)}
        icon={Phone}
        title="Sign In Phone Number"
        message={
          <>
            Sign in code has been sent to <strong className="text-gray-800">{form.phone || pending?.phone}</strong>, check
            your inbox to continue the sign in process.
          </>
        }
        primary="Submit"
        onPrimary={verifyCode}
        onClose={() => setPending(null)}
      >
        <div className="mt-4">
          <OtpInput
            value={code}
            onChange={(value) => {
              setCode(value)
              setCodeError('')
            }}
            error={codeError}
          />
        </div>
        <p className="mt-3 text-label-md text-ink">
          Haven’t received the sign in code? <button className="font-semibold text-purple-500">Resend it.</button>
        </p>
        <p className="mt-1 text-label-sm text-gray-400">Demo: no SMS is sent, use code {DEMO_CODE}.</p>
        <p className="mt-3 text-center text-label-md text-ink">
          Sign in with different method{' '}
          <button className="font-semibold text-purple-500" onClick={() => setPending(null)}>
            Here.
          </button>
        </p>
      </ConfirmSheet>
    </AuthBackdrop>
  )
}
