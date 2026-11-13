import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Diamond } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading, Dot, StatBox } from '../components/Card'
import EmptyState from '../components/EmptyState'
import PurpleHeader from '../components/PurpleHeader'
import RequestCard from '../components/RequestCard'
import Screen from '../components/Screen'
import Tabs from '../components/Tabs'
import { emptyReceipt, headerArt } from '../assets'
import { useData } from '../hooks/useData'

const emptyCopy = {
  review: ['Expense Review', 'No Expense In Review', 'any expense in review'],
  approved: ['Expense Approved', 'No Expense Approved', 'any expense approved'],
  rejected: ['Expense Rejected', 'No Expense Rejected', 'any expense rejected'],
}

export default function Expense() {
  const navigate = useNavigate()
  const { data } = useData()
  const { expenses, expenseSummary } = data
  const [tab, setTab] = useState('review')

  const tabs = [
    { id: 'review', label: 'Review', count: expenses.review.length },
    { id: 'approved', label: 'Approved', count: expenses.approved.length },
    { id: 'rejected', label: 'Rejected', count: expenses.rejected.length },
  ]
  const list = expenses[tab]
  const [heading, emptyTitle, emptyPhrase] = emptyCopy[tab]

  return (
    <Screen footer={<Button onClick={() => navigate('/expense/new')}>Submit Expense</Button>}>
      <PurpleHeader title="Expense Summary" subtitle="Claim your expenses here." art={headerArt.expense} />

      <div className="stagger -mt-20 space-y-3 px-3 pb-4">
        <Card>
          <CardHeading title="Total Expense" subtitle="Period 1 Jan 2024 - 30 Dec 2024" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <StatBox icon={<Diamond size={12} className="fill-purple-500 text-purple-500" />} label="Total" value={`$${expenseSummary.total}`} />
            <StatBox icon={<Dot className="bg-warning-500" />} label="Review" value={`$${expenseSummary.review}`} />
            <StatBox icon={<Dot className="bg-success-500" />} label="Approved" value={`$${expenseSummary.approved}`} />
          </div>
        </Card>

        <Tabs tabs={tabs} value={tab} onChange={setTab} />

        {list.length === 0 ? (
          <Card key={tab} className="animate-fade-in">
            <CardHeading title="Expense" subtitle={heading} />
            <EmptyState
              image={emptyReceipt}
              title={emptyTitle}
              message={`It looks like you don’t have ${emptyPhrase}. Don’t worry, this space will be updated as new expense is submitted.`}
            />
          </Card>
        ) : (
          list.map((item) => (
            <RequestCard
              key={`${tab}-${item.id}`}
              icon={ClipboardList}
              date={item.date}
              fields={[
                { label: 'Type', value: item.type },
                { label: 'Total Expense', value: item.amount },
              ]}
              outcome={item.outcome}
            />
          ))
        )}
      </div>
    </Screen>
  )
}
