import { Card, CardHeading } from '../components/Card'
import { HealthChip } from '../components/Chip'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { BurnoutGauge } from './Tasks'
import { burnout } from '../data/mock'

const W = 300
const H = 150
const PAD = { left: 30, right: 6, top: 14, bottom: 22 }

function Grid({ ticks, y, suffix = '' }) {
  return ticks.map((tick) => (
    <g key={tick}>
      <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="#eaecf0" strokeDasharray="3 3" />
      <text x={PAD.left - 6} y={y(tick) + 3} textAnchor="end" fontSize="8" fill="#667085">
        {tick}
        {suffix}
      </text>
    </g>
  ))
}

function WorkingLevelChart({ data }) {
  const [min, max] = [80, 120]
  const y = (v) => PAD.top + (1 - (v - min) / (max - min)) * (H - PAD.top - PAD.bottom)
  const slot = (W - PAD.left - PAD.right) / data.length
  const peak = Math.max(...data.map((d) => d.value))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Working level per sprint">
      <Grid ticks={[80, 90, 100, 110, 120]} y={y} />
      {data.map((d, i) => {
        const active = d.value === peak
        const x = PAD.left + slot * i + slot / 2
        return (
          <g key={d.label}>
            <rect
              className="bar-grow"
              style={{ animationDelay: `${i * 90}ms` }}
              x={x - 8}
              y={y(d.value)}
              width="16"
              height={y(min) - y(d.value)}
              rx="3"
              fill={active ? '#7a5af8' : '#eaecf0'}
            />
            {active && (
              <text x={x} y={y(d.value) - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#1d232e">
                {d.value}
              </text>
            )}
            <text x={x} y={H - 6} textAnchor="middle" fontSize="8" fontWeight={active ? 600 : 400} fill={active ? '#1d232e' : '#9b8afb'}>
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function WorkingPeriodChart({ data }) {
  const [min, max] = [20, 60]
  const y = (v) => PAD.top + (1 - (v - min) / (max - min)) * (H - PAD.top - PAD.bottom)
  const slot = (W - PAD.left - PAD.right) / data.length
  const points = data.map((d, i) => [PAD.left + slot * i + slot / 2, y(d.value)])
  const line = points.map(([px, py]) => `${px},${py}`).join(' ')
  const area = `${PAD.left},${y(min)} ${line} ${W - PAD.right},${y(min)}`
  const peak = Math.max(...data.map((d) => d.value))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Average working period per month">
      <defs>
        <linearGradient id="period-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bdb4fe" />
          <stop offset="100%" stopColor="#f4f3ff" />
        </linearGradient>
      </defs>
      <Grid ticks={[20, 30, 40, 50, 60]} y={y} suffix=" hrs" />
      <polygon points={area} fill="url(#period-fill)" className="animate-fade-in" style={{ animationDelay: '0.5s' }} />
      <polyline points={line} fill="none" stroke="#9b8afb" strokeWidth="1" className="line-draw" />
      {data.map((d, i) => {
        const [px, py] = points[i]
        const active = d.value === peak
        return (
          <g key={d.label}>
            <circle
              cx={px}
              cy={py}
              r="2.5"
              fill="white"
              stroke="#7a5af8"
              strokeWidth="1"
              className="animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            />
            {active && (
              <text x={px} y={py - 6} textAnchor="middle" fontSize="8" fontWeight="600" fill="#1d232e">
                {d.value} hrs
              </text>
            )}
            <text x={px} y={H - 6} textAnchor="middle" fontSize="8" fontWeight={active ? 600 : 400} fill={active ? '#1d232e' : '#9b8afb'}>
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function BurnoutStats() {
  return (
    <>
      <PageHeader title="Burnout Stats" />
      <Screen className="stagger space-y-3 p-3">
        <Card>
          <div className="flex items-center gap-2">
            <h2 className="text-title-sm font-semibold text-gray-900">Burnout Stats</h2>
            <HealthChip level={burnout.level} />
          </div>
          <p className="mt-1 text-label-md text-gray-600">You’ve maintain your task at the right pace! keep it up!</p>
          <BurnoutGauge level={burnout.level} fill={burnout.fill} />
        </Card>

        <Card>
          <CardHeading title="Working Level" subtitle="Your story point so far" />
          <div className="mt-2">
            <WorkingLevelChart data={burnout.workingLevel} />
          </div>
        </Card>

        <Card>
          <CardHeading title="Working Period" subtitle="Average your working period" />
          <div className="mt-2">
            <WorkingPeriodChart data={burnout.workingPeriod} />
          </div>
        </Card>
      </Screen>
    </>
  )
}
