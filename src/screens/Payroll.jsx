import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { payroll } from '../data/mock'

export default function Payroll() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader title="Payroll and Tax" />
      <Screen className="stagger space-y-3 p-3">
        {payroll.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate(`/profile/payroll/${p.id}`)}
            className="block w-full rounded-xl bg-white p-3 text-left shadow-card transition active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-title-sm font-semibold text-gray-900">{p.month}</h2>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div>
                <p className="text-label-sm text-gray-600">Total Hours</p>
                <p className="text-label-md font-medium text-gray-900">{p.hours}</p>
              </div>
              <div>
                <p className="text-label-sm text-gray-600">Received</p>
                <p className="text-label-md font-medium text-gray-900">{p.received}</p>
              </div>
              <div>
                <p className="text-label-sm text-gray-600">Paid On</p>
                <p className="text-label-md font-medium text-gray-900">{p.paid}</p>
              </div>
            </div>
          </button>
        ))}
      </Screen>
    </>
  )
}
