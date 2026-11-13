import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ClipboardList, Tag, Upload, Wallet, X } from 'lucide-react'
import Button from '../components/Button'
import CalendarSheet from '../components/CalendarSheet'
import { Card, CardHeading } from '../components/Card'
import OptionSheet from '../components/OptionSheet'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { SelectField, TextArea, TextField } from '../components/TextField'
import { bannerPeople, receiptImage } from '../assets'
import { expenseCategories } from '../data/mock'
import { useData } from '../hooks/useData'
import { formatLong } from '../utils/dates'

export default function ExpenseSubmit() {
  const navigate = useNavigate()
  const { submitExpense } = useData()
  const [hasReceipt, setHasReceipt] = useState(false)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(null)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [sheet, setSheet] = useState(null) // 'category' | 'date'
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const ready = hasReceipt && category && date && amount && description.trim()

  return (
    <>
      <PageHeader title="Submit Expense" />
      <Screen
        className="space-y-3 p-3"
        footer={
          <Button disabled={!ready} onClick={() => setConfirmOpen(true)}>
            Submit Expense
          </Button>
        }
      >
        <section className="relative h-[120px] animate-fade-up overflow-hidden rounded-xl bg-purple-500 pt-4 text-center">
          <h2 className="text-title-sm font-semibold text-white">Ensure All Document Well Prepared</h2>
          <p className="text-label-sm text-purple-100">1000+ Expenses already approved</p>
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <img src={bannerPeople} alt="" className="h-[61px] w-auto animate-fade-up" style={{ animationDelay: '0.25s' }} />
          </div>
        </section>

        <Card className="animate-fade-up space-y-3" >
          <CardHeading title="Fill Claim Information" subtitle="Information about claim details" />

          {hasReceipt ? (
            <div className="relative h-[255px] animate-pop-small overflow-hidden rounded-lg">
              <img src={receiptImage} alt="Uploaded receipt" className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Remove document"
                onClick={() => setHasReceipt(false)}
                className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-sm bg-error-500 text-white"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setHasReceipt(true)}
              className="flex h-24 w-full flex-col items-center justify-center rounded-lg border border-dashed border-purple-300 bg-purple-50"
            >
              <Upload size={18} className="text-purple-500" />
              <span className="mt-1 text-label-md font-medium text-purple-500">Upload Claim Document</span>
              <span className="text-[10px] text-gray-500">Format should be in .pdf .jpeg .png less than 5MB</span>
            </button>
          )}

          <SelectField label="Expense Category" icon={Tag} placeholder="Select Category" value={category} onClick={() => setSheet('category')} />
          <SelectField
            label="Transaction Date"
            icon={Calendar}
            placeholder="Enter Transaction Date"
            value={date ? formatLong(date) : ''}
            onClick={() => setSheet('date')}
          />
          <TextField
            label="Expense Amount ($USD)"
            icon={Wallet}
            inputMode="decimal"
            placeholder="Enter Amount"
            value={amount}
            onChange={(value) => setAmount(value.replace(/[^\d.]/g, ''))}
          />
          <TextArea label="Expense Description" placeholder="Enter Expense Description" value={description} onChange={setDescription} />
        </Card>
      </Screen>

      <OptionSheet
        open={sheet === 'category'}
        title="Expense Category"
        subtitle="Select Expense Category"
        options={expenseCategories}
        value={category}
        cancelLabel="Close Message"
        confirmLabel="Submit Date"
        onClose={() => setSheet(null)}
        onConfirm={(value) => {
          setCategory(value)
          setSheet(null)
        }}
      />

      <CalendarSheet
        open={sheet === 'date'}
        title="Transaction Date"
        subtitle="Select Transaction Date"
        initialMonth={new Date(2024, 8, 1)}
        value={date ? { start: date } : undefined}
        onClose={() => setSheet(null)}
        onConfirm={({ start }) => {
          setDate(start)
          setSheet(null)
        }}
      />

      <ConfirmSheet
        open={confirmOpen}
        icon={ClipboardList}
        title="Ready to Submit?"
        message="Double-check your expense details to ensure everything is correct. Do you want to proceed?"
        primary="Yes, Submit"
        secondary="No, Let me check"
        onPrimary={() => {
          submitExpense({ category, date, amount })
          setConfirmOpen(false)
          setDoneOpen(true)
        }}
        onSecondary={() => setConfirmOpen(false)}
      />

      <ConfirmSheet
        open={doneOpen}
        icon={ClipboardList}
        title="Expense Submitted!"
        message="Your expense report is in! You’ll receive your reimbursement with your payroll."
        primary="View Expense History"
        onPrimary={() => navigate('/expense')}
      />
    </>
  )
}
