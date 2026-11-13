import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Clock, Code, Frown, Smile } from 'lucide-react'
import Button from '../components/Button'
import { Card, CardHeading, StatBox } from '../components/Card'
import { HealthChip } from '../components/Chip'
import PurpleHeader from '../components/PurpleHeader'
import Screen from '../components/Screen'
import Tabs from '../components/Tabs'
import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'
import { emptyDocs, headerArt } from '../assets'
import { burnout } from '../data/mock'
import { useData } from '../hooks/useData'

function StatIcon({ className, children }) {
  return <span className={`grid h-4 w-4 place-items-center rounded-full text-white ${className}`}>{children}</span>
}

export default function Tasks() {
  const navigate = useNavigate()
  const { data } = useData()
  const [tab, setTab] = useState('all')
  const tasks = data.tasks
  const todoCount = data.todoBase + tasks.filter((t) => t.status === 'To Do').length

  const inProgress = tasks.filter((t) => t.status === 'In Progress')
  const finished = tasks.filter((t) => t.status === 'Done')
  const visible = { all: tasks, progress: inProgress, finish: finished }[tab]

  const tabs = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'progress', label: 'In Progress', count: inProgress.length },
    { id: 'finish', label: 'Finish', count: finished.length },
  ]

  return (
    <Screen footer={<Button onClick={() => navigate('/tasks/new')}>Create Task</Button>}>
      <PurpleHeader title="Challenges Awaiting" subtitle="Let’s tackle your to do list" art={headerArt.task} />

      <div className="stagger -mt-20 space-y-3 px-3 pb-4">
        <Card>
          <CardHeading title="Summary of Your Work" subtitle="Your current task progress" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <StatBox
              icon={<StatIcon className="bg-purple-500"><Code size={10} strokeWidth={3} /></StatIcon>}
              label="To Do"
              value={todoCount}
            />
            <StatBox
              icon={<StatIcon className="bg-warning-500"><Clock size={10} strokeWidth={3} /></StatIcon>}
              label="In Progress"
              value={inProgress.length}
            />
            <StatBox
              icon={<StatIcon className="bg-success-500"><Check size={10} strokeWidth={3} /></StatIcon>}
              label="Done"
              value={finished.length}
            />
          </div>
        </Card>

        <button type="button" onClick={() => navigate('/tasks/burnout')} className="block w-full text-left">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-title-sm font-semibold text-gray-900">{burnout.sprint} - Burnout Stats</h2>
                <HealthChip level={burnout.level} />
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <p className="mt-1 text-label-md text-gray-600">{burnout.message}</p>
            <BurnoutGauge level={burnout.level} fill={burnout.fill} />
          </Card>
        </button>

        <Tabs tabs={tabs} value={tab} onChange={setTab} />

        <Card key={tab} className="animate-fade-in space-y-3">
          {visible.length === 0 ? (
            <EmptyState
              image={emptyDocs}
              title="No Tasks Assigned"
              message="It looks like you don’t have any tasks assigned to you right now. Don’t worry, this space will be updated as new tasks become available."
            />
          ) : (
            visible.map((task) => <TaskCard key={task.id} task={task} onClick={() => navigate(`/tasks/${task.id}`)} />)
          )}
        </Card>
      </div>
    </Screen>
  )
}

export function BurnoutGauge({ level, fill }) {
  const good = level === 'Good'
  return (
    <div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white ${good ? 'bg-success-500' : 'bg-error-500'}`}>
        {good ? <Smile size={20} /> : <Frown size={20} />}
      </span>
      <div className="h-1 flex-1 rounded-full bg-gray-200">
        <div
          className={`h-full origin-left animate-grow-x rounded-full ${good ? 'bg-success-500' : 'bg-warning-500'}`}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  )
}
