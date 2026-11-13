import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatusBar from './StatusBar'

export default function PageHeader({ title, onBack }) {
  const navigate = useNavigate()

  return (
    <header className="shrink-0 bg-white">
      <StatusBar />
      <div className="relative flex h-11 items-center justify-center px-4">
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack ?? (() => navigate(-1))}
          className="absolute left-4 grid h-8 w-8 place-items-center rounded-full bg-purple-50 text-purple-500"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-title-md font-semibold text-ink">{title}</h1>
      </div>
    </header>
  )
}
