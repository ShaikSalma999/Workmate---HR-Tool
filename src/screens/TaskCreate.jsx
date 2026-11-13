import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarPlus, CircleDot, Layers, ShieldCheck, SquarePen, Upload, X } from 'lucide-react'
import Button from '../components/Button'
import { Card } from '../components/Card'
import OptionSheet from '../components/OptionSheet'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { ConfirmSheet } from '../components/Sheet'
import { SelectField, TextArea, TextField } from '../components/TextField'
import { taskMain, taskThumb1, taskThumb2 } from '../assets'
import { difficulties, members, priorities } from '../data/mock'
import { useData } from '../hooks/useData'

const sampleImages = [taskThumb1, taskThumb2, taskMain]

export default function TaskCreate() {
  const navigate = useNavigate()
  const { addTask } = useData()
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [member, setMember] = useState('')
  const [priority, setPriority] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [picker, setPicker] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const ready = title.trim() && description.trim() && member && priority && difficulty

  const pickers = {
    member: { title: 'Assign To', subtitle: 'Who will finish this task', options: members, value: member, set: setMember },
    priority: { title: 'Priority', subtitle: 'Select the priority', options: priorities, value: priority, set: setPriority },
    difficulty: { title: 'Difficulty', subtitle: 'Select the difficulty', options: difficulties, value: difficulty, set: setDifficulty },
  }
  const current = pickers[picker]

  return (
    <>
      <PageHeader title="Create New Task" />
      <Screen
        className="p-3"
        footer={
          <Button disabled={!ready} onClick={() => setConfirmOpen(true)}>
            Create Task
          </Button>
        }
      >
        <Card className="animate-fade-up space-y-3">
          <div>
            <h2 className="text-title-sm font-semibold text-gray-900">Attachment</h2>
            <p className="text-label-md text-gray-600">Format should be in .pdf .jpeg .png less than 5MB</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((slot) =>
                images[slot] ? (
                  <div key={slot} className="relative h-20 animate-pop-small overflow-hidden rounded-lg">
                    <img src={images[slot]} alt="Attachment" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      onClick={() => setImages((list) => list.filter((_, i) => i !== slot))}
                      className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-sm bg-error-500 text-white"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </div>
                ) : (
                  <button
                    key={slot}
                    type="button"
                    aria-label="Add attachment"
                    onClick={() => setImages((list) => [...list, sampleImages[list.length % sampleImages.length]])}
                    className="grid h-20 place-items-center rounded-lg border border-dashed border-purple-300 bg-purple-50 text-purple-500"
                  >
                    <Upload size={20} />
                  </button>
                ),
              )}
            </div>
          </div>

          <TextField label="Task Title" icon={SquarePen} placeholder="Enter Task Title" value={title} onChange={setTitle} />
          <TextArea label="Task Description" placeholder="Enter Task Description" value={description} onChange={setDescription} />
          <SelectField label="Assign To" icon={ShieldCheck} placeholder="Select Member" value={member} onClick={() => setPicker('member')} />
          <SelectField label="Priority" icon={Layers} placeholder="Select Priority" value={priority} onClick={() => setPicker('priority')} />
          <SelectField label="Difficulty" icon={CircleDot} placeholder="Select Difficulty" value={difficulty} onClick={() => setPicker('difficulty')} />
        </Card>
      </Screen>

      <OptionSheet
        open={Boolean(current)}
        title={current?.title}
        subtitle={current?.subtitle}
        options={current?.options ?? []}
        value={current?.value}
        onClose={() => setPicker(null)}
        onConfirm={(value) => {
          current.set(value)
          setPicker(null)
        }}
      />

      <ConfirmSheet
        open={confirmOpen}
        icon={CalendarPlus}
        title="Create New Task"
        message="Double-check your task details to ensure everything is correct. Do you want to proceed?"
        primary="Yes, Proceed Now"
        secondary="No, Let me check"
        onPrimary={() => {
          addTask({ title, description, member, priority, difficulty, images })
          setConfirmOpen(false)
          setDoneOpen(true)
        }}
        onSecondary={() => setConfirmOpen(false)}
      />

      <ConfirmSheet
        open={doneOpen}
        icon={CalendarPlus}
        title="Task Has Been Created!"
        message="Congratulations! Task has been created! view your task in the task management"
        primary="View Task Management"
        onPrimary={() => navigate('/tasks')}
      />
    </>
  )
}
