import Link from 'next/link'
import { StatusBadge } from '@/components/ui/status-badge'
import { Wrench, Clock, CheckCircle, Users, Bike } from 'lucide-react'

type InterventionStatus = 'DEPOSITED' | 'DIAGNOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY' | 'DELIVERED'

const stats = [
  { label: 'Interventions actives', value: '8', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Motos en attente', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Prêtes à récupérer', value: '2', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Clients ce mois', value: '14', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const recentInterventions = [
  { id: '1', brand: 'Honda', model: 'CBR 600', client: 'Thomas Dupont', status: 'IN_PROGRESS' as InterventionStatus },
  { id: '2', brand: 'Yamaha', model: 'MT-07', client: 'Marie Leblanc', status: 'DIAGNOSED' as InterventionStatus },
  { id: '3', brand: 'Kawasaki', model: 'Z900', client: 'Lucas Martin', status: 'READY' as InterventionStatus },
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0C0A09]">Tableau de bord</h1>
        <p className="text-[#78716C] mt-1">Bienvenue, bonne journée au garage.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-[#78716C]">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#0C0A09]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent interventions */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#0C0A09]">Interventions récentes</h2>
          <Link href="/interventions" className="text-sm text-[#CA8A04] hover:underline font-medium">
            Voir tout
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E5E0] divide-y divide-[#E8E5E0]">
          {recentInterventions.map((i) => (
            <Link
              key={i.id}
              href={`/interventions/${i.id}`}
              className="flex items-center justify-between p-4 hover:bg-[#FAFAF9] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F4F2] flex items-center justify-center">
                  <Bike className="w-5 h-5 text-[#78716C]" />
                </div>
                <div>
                  <div className="font-medium text-[#0C0A09] text-sm">{i.brand} {i.model}</div>
                  <div className="text-xs text-[#78716C]">{i.client}</div>
                </div>
              </div>
              <StatusBadge status={i.status} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
