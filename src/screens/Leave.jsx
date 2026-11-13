import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading, Dot, StatBox } from '../components/Card'
import EmptyState from '../components/EmptyState'
import PurpleHeader from '../components/PurpleHeader'
import RequestCard from '../components/RequestCard'
import Screen from '../components/Screen'
import Tabs from '../components/Tabs'
import { emptyLuggage, headerArt } from '../assets'
import { leaveSummary } from '../data/mock'
import { useData } from '../hooks/useData'

export default function Leave() {
  const navigate = useNavigate()
  const { data } = useData()
  const { leaves } = data
  const [tab, setTab] = useState('review')

  const tabs = [
    { id: 'review', label: 'Review', count: leaves.review.length },
    { id: 'approved', label: 'Approved', count: leaves.approved.length },
    { id: 'rejected', label: 'Rejected', count: leaves.rejected.length },
  ]
  const list = leaves[tab]

  return (
    <Screen footer={<Button onClick={() => navigate('/leave/new')}>Submit Leave</Button>}>
      <PurpleHeader title="Leave Summary" subtitle="Submit Leave" art={headerArt.leave} />

      <div className="stagger -mt-20 space-y-3 px-3 pb-4">
        <Card>
          <CardHeading title="Total Leave" subtitle="Period 1 Jan 2024 - 30 Dec 2024" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatBox icon={<Dot className="bg-success-500" />} label="Available" value={leaveSummary.available} />
            <StatBox icon={<Dot className="bg-purple-500" />} label="Leave Used" value={leaveSummary.used} />
          </div>
        </Card>

        <Tabs tabs={tabs} value={tab} onChange={setTab} />

        {list.length === 0 ? (
          <Card key={tab} className="animate-fade-in">
            <CardHeading title="Leave Submitted" subtitle="Leave information" />
            <EmptyState
              image={emptyLuggage}
              imageClass="h-24"
              title="No Leave Submitted!"
              message="Ready to catch some fresh air? Click “Submit Leave” and take that well-deserved break!"
            />
          </Card>
        ) : (
          list.map((item) => (
            <RequestCard
              key={`${tab}-${item.id}`}
              icon={Sparkles}
              date={item.date}
              fields={[
                { label: 'Leave Date', value: item.range },
                { label: 'Total Leave', value: item.total },
              ]}
              outcome={item.outcome}
            />
          ))
        )}
      </div>
    </Screen>
  )
}
