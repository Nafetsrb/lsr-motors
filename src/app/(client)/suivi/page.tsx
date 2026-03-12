import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { ChevronRight, Bike } from 'lucide-react'

type InterventionStatus = 'DEPOSITED' | 'DIAGNOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY' | 'DELIVERED'

const mockSuivi = [
  {
    id: '1',
    moto: 'Honda CBR 600 (2019)',
    licensePlate: 'AB-123-CD',
    description: 'Révision complète + changement freins',
    status: 'IN_PROGRESS' as InterventionStatus,
    date: '12/03/2026',
    estimatedCost: 450,
  },
  {
    id: '7',
    moto: 'Honda CBR 600 (2019)',
    licensePlate: 'AB-123-CD',
    description: 'Changement pneus',
    status: 'DELIVERED' as InterventionStatus,
    date: '15/01/2026',
    estimatedCost: 280,
  },
]

export default function SuiviPage() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Suivi de ma moto</h1>
        <p className="text-sm text-zinc-500 mt-1">Vos interventions chez LSR Motors</p>
      </div>

      <div className="space-y-3">
        {mockSuivi.map((item) => (
          <Link key={item.id} href={`/suivi/${item.id}`}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-100 rounded-lg shrink-0">
                    <Bike size={18} className="text-zinc-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-900 text-sm">{item.moto}</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{item.licensePlate}</div>
                    <div className="text-xs text-zinc-600 mt-1">{item.description}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <StatusBadge status={item.status} />
                      <span className="text-xs text-zinc-400">{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <ChevronRight size={16} className="text-zinc-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
