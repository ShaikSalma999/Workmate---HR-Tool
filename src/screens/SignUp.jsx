import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Mail, ScanFace, UserRound } from 'lucide-react'
import Button from '../components/Button'
import Logo from '../components/Logo'
import OtpInput from '../components/OtpInput'
import { ConfirmSheet, Sheet } from '../components/Sheet'
import StatusBar from '../components/StatusBar'
import { Checkbox, PhoneField, TextField } from '../components/TextField'
import { useAuth } from '../hooks/useAuth'
import { DEMO_CODE, validateNewAccount } from '../utils/accounts'

const terms = [
  ['Terms and Conditions', 'Acceptance: By using the Work Mate app, you agree to comply with all applicable terms and conditions.'],
  ['Usage', 'This app is for personal use only and may not be used for commercial purposes without permission.'],
  ['Account', 'You are responsible for the security of your account and all activities that occur within it.'],
  ['Content', 'You must not upload content that violates copyright, privacy, or applicable laws.'],
  ['Changes', 'We reserve the right to change the terms and conditions at any time and will notify you of these changes through the app or via email.'],
  ['Privacy Policy', 'Data Collection: We collect personal data such as name, email, and location to process transactions and improve our services.'],
  ['Security', 'We protect your data with appropriate security measures to prevent unauthorized access.'],
]

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [errors, setErrors] = useState({})
  const [attempt, setAttempt] = useState(0)
  const [codeError, setCodeError] = useState('')
  const [form, setForm] = useState({ email: '', phone: '', companyId: '', password: '', confirm: '' })
  const [agree, setAgree] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [code, setCode] = useState('')

  const update = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = () => {
    const found = validateNewAccount(form)
    setErrors(found)
    if (Object.keys(found).length) {
      setAttempt((n) => n + 1)
      return
    }
    setCode('')
    setCodeError('')
    setVerifyOpen(true)
  }

  const verify = () => {
    if (code !== DEMO_CODE) {
      setCodeError('That code isn’t right. Try again.')
      return
    }
    const result = signUp(form)
    if (!result.ok) {
      setVerifyOpen(false)
      setErrors(result.errors)
      return
    }
    setVerifyOpen(false)
    setWelcomeOpen(true)
  }
  const openTerms = (e) => {
    e.preventDefault()
    setTermsOpen(true)
  }

  return (
    <div className="flex h-full flex-col bg-purple-25">
      <StatusBar />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex animate-fade-up flex-col items-center pt-4">
          <Logo />
          <h1 className="mt-2 text-title-md font-semibold text-ink">Work Mate</h1>
          <p className="text-label-md text-gray-600">Register Using Your Credentials</p>
        </div>

        <div className="mt-5 space-y-3">
          <TextField key={`e${attempt}`} label="Email" icon={Mail} type="email" placeholder="Email" value={form.email} onChange={update('email')} error={errors.email} />
          <PhoneField key={`p${attempt}`} label="Phone Number" value={form.phone} onChange={update('phone')} error={errors.phone} />
          <TextField key={`c${attempt}`} label="Company ID" icon={Building2} placeholder="Company ID" value={form.companyId} onChange={update('companyId')} error={errors.companyId} />
          <TextField key={`w${attempt}`} label="Password" icon={ScanFace} type="password" placeholder="Password" value={form.password} onChange={update('password')} error={errors.password} />
          <TextField key={`x${attempt}`} label="Confirm Password" icon={ScanFace} type="password" placeholder="Confirm Password" value={form.confirm} onChange={update('confirm')} error={errors.confirm} />
        </div>

        <div className="mt-3">
          <Checkbox checked={agree} onChange={setAgree}>
            <span>
              I agree with{' '}
              <button className="font-semibold text-purple-500" onClick={openTerms}>
                terms &amp; conditions
              </button>{' '}
              and{' '}
              <button className="font-semibold text-purple-500" onClick={openTerms}>
                privacy policy
              </button>
            </span>
          </Checkbox>
        </div>

        <Button className="mt-4" disabled={!agree} onClick={submit}>
          Sign Up
        </Button>

        <p className="mt-8 text-center text-label-md text-ink">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-medium text-purple-500">
            Sign in here
          </Link>
        </p>
      </div>

      <Sheet open={termsOpen} onClose={() => setTermsOpen(false)} className="max-h-[88%]">
        <h2 className="text-center text-title-lg font-semibold text-ink">Terms &amp; Conditions and Privacy Policy</h2>
        <div className="no-scrollbar mt-4 max-h-[420px] space-y-3 overflow-y-auto rounded-lg bg-gray-25 p-3 text-label-sm text-gray-700">
          {terms.map(([heading, body]) => (
            <p key={heading}>
              <strong className="block text-gray-800">{heading}</strong>
              {body}
            </p>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          <Button
            onClick={() => {
              setAgree(true)
              setTermsOpen(false)
            }}
          >
            I Agree
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setAgree(false)
              setTermsOpen(false)
            }}
          >
            Decline
          </Button>
        </div>
      </Sheet>

      <ConfirmSheet
        open={verifyOpen}
        icon={Mail}
        title="Email Verification Sent!"
        message={`A verification code will be sent to the email ${form.email || 'Hello@work.com'} for your account verification process.`}
        primary="Submit"
        onPrimary={verify}
        onClose={() => setVerifyOpen(false)}
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
          Haven’t received the verification code? <button className="font-semibold text-purple-500">Resend it.</button>
        </p>
        <p className="mt-1 text-label-sm text-gray-400">Demo: no email is sent, use code {DEMO_CODE}.</p>
      </ConfirmSheet>

      <ConfirmSheet
        open={welcomeOpen}
        icon={UserRound}
        title="Welcome To Work Mate!"
        message="To enhance your user experience, please set up your profile first. This will help us tailor the app to your needs and ensure you get the most out of our features!"
        primary="Set Up My Profile"
        secondary="Explore The App First"
        onPrimary={() => navigate('/home')}
        onSecondary={() => navigate('/home')}
      />
    </div>
  )
}
