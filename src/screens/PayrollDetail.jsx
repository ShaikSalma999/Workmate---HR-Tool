import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Clock, Download } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading, StatBox } from '../components/Card'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { payroll } from '../data/mock'
import { useAuth } from '../hooks/useAuth'
import { fullName } from '../utils/accounts'
import { downloadPdf } from '../utils/pdf'

const money = (n) => `$${n.toFixed(2)}`

function Line({ label, value, tone }) {
  const color = tone === 'minus' ? 'text-error-500' : tone === 'plus' ? 'text-success-500' : 'text-gray-900'
  return (
    <div className="flex items-center justify-between py-1.5 text-label-md">
      <span className="text-gray-700">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  )
}

export default function PayrollDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const slip = payroll.find((p) => p.id === id)
  if (!slip) return <Navigate to="/profile/payroll" replace />

  const total = slip.basic - slip.tax + slip.reimbursement + slip.bonus + slip.overtime

  const save = () => {
    downloadPdf(`payroll-${slip.id}.pdf`, [
      { text: 'Work Mate - Payroll', size: 20, bold: true },
      { text: `${slip.month}  |  ${fullName(user)}`, size: 12 },
      { text: ' ', size: 8 },
      { text: `Basic Salary: ${money(slip.basic)}` },
      { text: `Tax: -${money(slip.tax)}` },
      { text: `Reimbursement: +${money(slip.reimbursement)}` },
      { text: `Bonus: +${money(slip.bonus)}` },
      { text: `Overtime: ${money(slip.overtime)}` },
      { text: ' ', size: 8 },
      { text: `Total Salary: ${money(total)}`, size: 14, bold: true },
      { text: `Paid on ${slip.paid}`, size: 10 },
    ])
    setSaved(true)
  }

  return (
    <>
      <PageHeader title="Payroll and Tax" />
      <Screen className="stagger space-y-3 p-3" footer={<Button onClick={save}>Save As PDF</Button>}>
        <Card>
          <CardHeading title="Total Working Hour" subtitle={`Paid Period ${slip.month}`} />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatBox icon={<Clock size={14} className="text-gray-400" />} label="Overtime" value="00:00 Hrs" />
            <StatBox icon={<Clock size={14} className="text-gray-400" />} label="This Pay Period" value="40:00 Hrs" />
          </div>
        </Card>

        <Card>
          <CardHeading title="Payroll Details" subtitle="Details about payroll" />
          <div className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
            <Line label="Basic Salary" value={money(slip.basic)} />
            <Line label="Tax" value={`${money(slip.tax)}-`} tone="minus" />
            <Line label="Reimbursement" value={`${money(slip.reimbursement)}+`} tone="plus" />
            <Line label="Bonus" value={`${money(slip.bonus)}+`} tone="plus" />
            <Line label="Overtime" value={money(slip.overtime)} />
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-gray-300 pt-3 text-title-md font-semibold text-ink">
            <span>Total Salary</span>
            <span>{money(total)}</span>
          </div>
        </Card>
      </Screen>

      <ConfirmSheet
        open={saved}
        icon={Download}
        title="Payroll Saved!"
        message="Your payroll has been successfully saved. You can check it on your device storage."
        primary="Close Message"
        onPrimary={() => setSaved(false)}
      />
    </>
  )
}
