import { Box, CalendarDays, Hexagon, SquareTerminal, Tag } from 'lucide-react'
import { Card, CardHeading } from '../components/Card'
import PageHeader from '../components/PageHeader'
import Screen from '../components/Screen'
import { laptop } from '../assets'
import { officeAsset } from '../data/mock'

function ReadOnly({ label, icon: Icon, value }) {
  return (
    <div>
      <span className="mb-1.5 block text-label-md font-medium text-gray-700">{label}</span>
      <div className="flex h-11 items-center gap-2 rounded-lg border border-purple-300 bg-white px-3 text-body-md text-gray-900">
        <Icon size={18} className="shrink-0 text-purple-500" />
        {value}
      </div>
    </div>
  )
}

export default function OfficeAssets() {
  return (
    <>
      <PageHeader title="Office Assets" />
      <Screen className="p-3">
        <Card className="animate-fade-up space-y-3">
          <CardHeading title="Assets Information" subtitle="Your office assets information" />
          <img src={laptop} alt={officeAsset.name} className="h-[250px] w-full rounded-lg object-cover" />
          <ReadOnly label="Assets Name" icon={SquareTerminal} value={officeAsset.name} />
          <ReadOnly label="Brand" icon={Tag} value={officeAsset.brand} />
          <ReadOnly label="Warranty Status" icon={Hexagon} value={officeAsset.warranty} />
          <ReadOnly label="Buying Date" icon={Box} value={officeAsset.buyingDate} />
          <ReadOnly label="Received On" icon={CalendarDays} value={officeAsset.receivedOn} />
        </Card>
      </Screen>
    </>
  )
}
