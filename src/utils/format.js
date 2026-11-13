const pad = (n) => String(n).padStart(2, '0')

export const formatHM = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000))
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}`
}

export const formatHMS = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000))
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`
}

export const formatClock = (date) => {
  const d = new Date(date)
  const h = d.getHours()
  return `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`
}

export const formatDotTime = (date = new Date()) => {
  const d = new Date(date)
  return `${pad(d.getHours())}.${pad(d.getMinutes())}`
}

export const dayKey = (date = new Date()) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const formatLong = (date) =>
  new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const formatShort = (date) =>
  new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export const formatDayMonth = (date) =>
  new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'short' })

export const daysBetween = (start, end) =>
  Math.round((new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / 86400000) + 1
