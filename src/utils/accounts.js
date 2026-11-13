import { read, remove, write } from './storage'

export const ACCOUNTS_KEY = 'workmate.accounts'
export const SESSION_KEY = 'workmate.session'

export const DEMO_CODE = '123456'

export const demoAccount = {
  id: 'acc-demo',
  firstName: 'Tonald',
  lastName: 'Drump',
  email: 'tonald@work.com',
  phone: '+62 82150005000',
  employeeId: '11234',
  companyId: '1015015',
  password: 'Work@1234',
  position: 'Junior Full Stack Developer',
  birthDate: '1997-12-10',
  country: 'Indonesia',
  state: 'DKI Jakarta',
  city: 'Jakarta Selatan',
  address: 'Jl Mampang Prapatan XIV No 7A, Jakarta Selatan 12790',
  avatar: 'a',
}

export const normalizeEmail = (email = '') => email.trim().toLowerCase()
export const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

export const normalizePhone = (phone = '') => {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  return digits
}

export const fullName = (account) => [account?.firstName, account?.lastName].filter(Boolean).join(' ')

export function getAccounts() {
  const stored = read(ACCOUNTS_KEY)
  if (Array.isArray(stored) && stored.length) return stored
  write(ACCOUNTS_KEY, [demoAccount])
  return [demoAccount]
}

const saveAccounts = (list) => write(ACCOUNTS_KEY, list)

export const findById = (id) => getAccounts().find((a) => a.id === id) ?? null
export const findByEmail = (email) => getAccounts().find((a) => normalizeEmail(a.email) === normalizeEmail(email)) ?? null

const lookups = {
  email: {
    label: 'Email',
    find: (value) => findByEmail(value),
    check: (value) => (isValidEmail(value) ? null : 'Enter a valid email address'),
  },
  employee: {
    label: 'Employee ID',
    find: (value) => getAccounts().find((a) => a.employeeId === value.trim()) ?? null,
    check: (value) => (value.trim() ? null : 'Enter your employee ID'),
  },
  phone: {
    label: 'Phone number',
    find: (value) => getAccounts().find((a) => normalizePhone(a.phone) === normalizePhone(value)) ?? null,
    check: (value) => (normalizePhone(value).length >= 9 ? null : 'Enter a valid phone number'),
  },
}

export function checkCredentials(method, identifier, password) {
  const lookup = lookups[method]
  const formatError = lookup.check(identifier)
  if (formatError) return { ok: false, field: 'identifier', message: formatError }

  const account = lookup.find(identifier)
  if (!account) {
    return {
      ok: false,
      field: 'identifier',
      message: method === 'email' ? 'Email isn’t registered to any account' : `${lookup.label} isn’t registered to any account`,
    }
  }

  if (method !== 'phone') {
    if (!password) return { ok: false, field: 'password', message: 'Enter your password' }
    if (account.password !== password) return { ok: false, field: 'password', message: 'Wrong Password' }
  }
  return { ok: true, account }
}

export function validateNewAccount({ email, phone, companyId, password, confirm }) {
  const errors = {}
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  else if (findByEmail(email)) errors.email = 'This email is already registered'
  if (normalizePhone(phone).length < 9) errors.phone = 'Enter a valid phone number'
  else if (getAccounts().some((a) => normalizePhone(a.phone) === normalizePhone(phone))) errors.phone = 'This phone number is already registered'
  if (!companyId.trim()) errors.companyId = 'Enter your company ID'
  if (password.length < 8) errors.password = 'Use at least 8 characters'
  if (confirm !== password) errors.confirm = 'Passwords do not match'
  return errors
}

export function createAccount(form) {
  const errors = validateNewAccount(form)
  if (Object.keys(errors).length) return { ok: false, errors }

  const { email, phone, companyId, password } = form
  const local = email.trim().split('@')[0]
  const account = {
    id: `acc-${Date.now()}`,
    firstName: local.charAt(0).toUpperCase() + local.slice(1),
    lastName: '',
    email: email.trim(),
    phone: phone.trim(),
    employeeId: companyId.trim(),
    companyId: companyId.trim(),
    password,
    position: 'Team Member',
    birthDate: '',
    country: '',
    state: '',
    city: '',
    address: '',
    avatar: 'a',
  }
  saveAccounts([...getAccounts(), account])
  return { ok: true, account }
}

export function updateAccount(id, patch) {
  const list = getAccounts().map((a) => (a.id === id ? { ...a, ...patch } : a))
  saveAccounts(list)
  return list.find((a) => a.id === id) ?? null
}

export function resetPassword(email, password) {
  const account = findByEmail(email)
  if (!account) return { ok: false, message: 'Email isn’t registered to any account' }
  if (password.length < 8) return { ok: false, message: 'Use at least 8 characters' }
  updateAccount(account.id, { password })
  return { ok: true }
}

export function changePassword(id, current, next, confirm) {
  const account = findById(id)
  const errors = {}
  if (!account || account.password !== current) errors.current = 'Wrong Password'
  if (next.length < 8) errors.next = 'Use at least 8 characters'
  else if (next === current) errors.next = 'Choose a password you haven’t used before'
  if (confirm !== next) errors.confirm = 'Passwords do not match'
  if (Object.keys(errors).length) return { ok: false, errors }
  updateAccount(id, { password: next })
  return { ok: true }
}

export function saveSession(id, remember) {
  clearSession()
  write(SESSION_KEY, { id }, remember ? 'localStorage' : 'sessionStorage')
}

export function loadSession() {
  const session = read(SESSION_KEY) ?? read(SESSION_KEY, null, 'sessionStorage')
  return session?.id ? findById(session.id) : null
}

export function clearSession() {
  remove(SESSION_KEY)
  remove(SESSION_KEY, 'sessionStorage')
}
