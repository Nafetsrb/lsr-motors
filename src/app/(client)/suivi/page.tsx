import Link from 'next/link'
import { StatusBadge } from '@/components/ui/status-badge'
import { Bike, ChevronRight, CheckCircle2 } from 'lucide-react'

type InterventionStatus = 'DEPOSITED' | 'DIAGNOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY' | 'DELIVERED'

const clientName = 'Thomas'

const mockSuivi = [
  {
    id: '1',
    brand: 'Honda',
    model: 'CBR 600',
    year: 2022,
    licensePlate: 'AB-123-CD',
    description: 'Révision complète + changement freins',
    status: 'IN_PROGRESS' as InterventionStatus,
    depositedAt: '10 mars 2026',
    taskCount: 3,
  },
  {
    id: '7',
    brand: 'Honda',
    model: 'CB500F',
    year: 2020,
    licensePlate: 'EF-456-GH',
    description: 'Changement pneus',
    status: 'DELIVERED' as InterventionStatus,
    depositedAt: '15 jan. 2026',
    taskCount: 1,
  },
]

const activeInterventions = mockSuivi.filter(i => i.status !== 'DELIVERED')
const pastInterventions = mockSuivi.filter(i => i.status === 'DELIVERED')

export default function SuiviPage() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0C0A09]">Bonjour {clientName} 👋</h1>
        <p className="text-[#78716C] mt-1">Voici vos motos en cours chez LSR Motors.</p>
      </div>

      {/* Active interventions */}
      {activeInterventions.length > 0 ? (
        <div className="space-y-4 mb-8">
          {activeInterventions.map((item) => (
            <Link key={item.id} href={`/suivi/${item.id}`}>
              <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#F5F4F2] flex items-center justify-center">
                    <Bike className="w-7 h-7 text-[#78716C]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0C0A09]">{item.brand} {item.model} {item.year}</div>
                    <div className="text-sm text-[#78716C]">{item.licensePlate}</div>
                    <div className="text-xs text-[#78716C] mt-0.5">Déposée le {item.depositedAt}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#E8E5E0] ml-auto" />
                </div>
                <StatusBadge status={item.status} />
                <div className="mt-3 text-sm text-[#78716C]">{item.taskCount} travaux en cours</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E5E0] p-8 shadow-sm text-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="font-semibold text-[#0C0A09]">Aucune moto en cours</p>
          <p className="text-sm text-[#78716C] mt-1">Toutes vos motos ont été restituées. À bientôt !</p>
        </div>
      )}

      {/* Past interventions */}
      {pastInterventions.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-[#78716C] uppercase tracking-wide mb-3">Historique</h2>
          <div className="bg-white rounded-xl border border-[#E8E5E0] divide-y divide-[#E8E5E0] shadow-sm">
            {pastInterventions.map((item) => (
              <Link key={item.id} href={`/suivi/${item.id}`} className="flex items-center gap-4 p-4 hover:bg-[#FAFAF9] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#F5F4F2] flex items-center justify-center">
                  <Bike className="w-5 h-5 text-[#78716C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#0C0A09] text-sm">{item.brand} {item.model} {item.year}</div>
                  <div className="text-xs text-[#78716C]">{item.description}</div>
                </div>
                <StatusBadge status={item.status} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
