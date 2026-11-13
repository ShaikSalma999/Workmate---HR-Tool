import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ScanFace, ShieldCheck } from 'lucide-react'
import AuthBackdrop from '../components/AuthBackdrop'
import Button from '../components/Button'
import OtpInput from '../components/OtpInput'
import { Sheet } from '../components/Sheet'
import { TextField } from '../components/TextField'
import { DEMO_CODE, findByEmail, isValidEmail, resetPassword } from '../utils/accounts'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [passwords, setPasswords] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [attempt, setAttempt] = useState(0)

  const fail = (next) => {
    setErrors(next)
    setAttempt((n) => n + 1)
  }

  const sendCode = () => {
    if (!isValidEmail(email)) return fail({ email: 'Enter a valid email address' })
    if (!findByEmail(email)) return fail({ email: 'Email isn’t registered to any account' })
    setErrors({})
    setStep('code')
  }

  const checkCode = () => {
    if (code !== DEMO_CODE) return fail({ code: 'That code isn’t right. Try again.' })
    setErrors({})
    setStep('password')
  }

  const savePassword = () => {
    if (passwords.password.length < 8) return fail({ password: 'Use at least 8 characters' })
    if (passwords.password !== passwords.confirm) return fail({ confirm: 'Passwords do not match' })
    const result = resetPassword(email, passwords.password)
    if (!result.ok) return fail({ password: result.message })
    setErrors({})
    setStep('done')
  }

  return (
    <AuthBackdrop>
      <Sheet open icon={ShieldCheck} onClose={() => navigate('/sign-in')}>
        <div key={step} className="animate-fade-up">
          {step === 'email' && (
            <>
              <h1 className="text-center text-title-lg font-semibold text-ink">Forgot Password</h1>
              <p className="mt-2 text-label-md text-gray-600">
                A verification code will be sent to your email to reset your password.
              </p>
              <TextField
                key={`email-${attempt}`}
                className="mt-4"
                label="Email"
                icon={Mail}
                type="email"
                placeholder="My email"
                value={email}
                onChange={(value) => {
                  setEmail(value)
                  setErrors({})
                }}
                error={errors.email}
              />
              <Button className="mt-5" disabled={!email} onClick={sendCode}>
                Send Verification Code
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <h1 className="text-center text-title-lg font-semibold text-ink">Forgot Password</h1>
              <p className="mt-2 text-label-md text-gray-600">
                A reset code has been sent to <strong className="text-gray-800">{email}</strong>, check your email to
                continue the password reset process.
              </p>
              <div className="mt-4">
                <OtpInput
                  key={attempt}
                  value={code}
                  onChange={(value) => {
                    setCode(value)
                    setErrors({})
                  }}
                  error={errors.code}
                />
              </div>
              <p className="mt-3 text-label-md text-ink">
                Haven’t received the verification code? <button className="font-semibold text-purple-500">Resend it.</button>
              </p>
              <p className="mt-1 text-label-sm text-gray-400">Demo: no email is sent, use code {DEMO_CODE}.</p>
              <Button className="mt-5" disabled={code.length < 6} onClick={checkCode}>
                Submit
              </Button>
            </>
          )}

          {step === 'password' && (
            <>
              <h1 className="text-center text-title-lg font-semibold text-ink">Set a New Password</h1>
              <p className="mt-2 text-label-md text-gray-600">
                Please set a new password to secure your Work Mate account.
              </p>
              <div className="mt-4 space-y-3">
                <TextField
                  key={`pw-${attempt}`}
                  label="Password"
                  icon={ScanFace}
                  type="password"
                  placeholder="Input Password"
                  value={passwords.password}
                  onChange={(value) => {
                    setPasswords((p) => ({ ...p, password: value }))
                    setErrors({})
                  }}
                  error={errors.password}
                />
                <TextField
                  key={`cf-${attempt}`}
                  label="Confirm Password"
                  icon={ScanFace}
                  type="password"
                  placeholder="Re Enter Your Password"
                  value={passwords.confirm}
                  onChange={(value) => {
                    setPasswords((p) => ({ ...p, confirm: value }))
                    setErrors({})
                  }}
                  error={errors.confirm}
                />
              </div>
              <Button className="mt-5" disabled={!passwords.password || !passwords.confirm} onClick={savePassword}>
                Submit
              </Button>
            </>
          )}

          {step === 'done' && (
            <>
              <h1 className="text-center text-title-lg font-semibold text-ink">Password Has Been Created</h1>
              <p className="mt-2 text-label-md text-gray-600">
                To log in to your account, click the Sign in button and enter your email along with your new password.
              </p>
              <Button className="mt-5" onClick={() => navigate('/sign-in')}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </Sheet>
    </AuthBackdrop>
  )
}
