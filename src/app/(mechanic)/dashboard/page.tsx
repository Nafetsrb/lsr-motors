import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench, Clock, CheckCircle, Users } from 'lucide-react'

const stats = [
  {
    title: 'Interventions actives',
    value: '12',
    description: '3 en attente de diagnostic',
    icon: Wrench,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'En attente de pièces',
    value: '4',
    description: 'Délai moyen : 3 jours',
    icon: Clock,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'Prêtes à livrer',
    value: '3',
    description: 'Clients à contacter',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Clients actifs',
    value: '28',
    description: '+2 ce mois',
    icon: Users,
    color: 'text-zinc-600',
    bg: 'bg-zinc-100',
  },
]

const recentInterventions = [
  { id: '1', client: 'Thomas Dupont', moto: 'Honda CBR 600 (2019)', status: 'En cours', date: '12/03/2026' },
  { id: '2', client: 'Marie Leblanc', moto: 'Yamaha MT-07 (2021)', status: 'Diagnostiquée', date: '11/03/2026' },
  { id: '3', client: 'Lucas Martin', moto: 'Kawasaki Z900 (2020)', status: 'Prête', date: '10/03/2026' },
  { id: '4', client: 'Sophie Bernard', moto: 'Ducati Monster (2018)', status: 'Déposée', date: '10/03/2026' },
]

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Tableau de bord</h1>
        <p className="text-sm text-zinc-500 mt-1">Vue d&apos;ensemble du garage</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
              <div className="text-xs font-medium text-zinc-700 mt-0.5">{stat.title}</div>
              <div className="text-xs text-zinc-400 mt-1">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent interventions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Interventions récentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-100">
            {recentInterventions.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-zinc-900">{item.client}</div>
                  <div className="text-xs text-zinc-500">{item.moto}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-zinc-700">{item.status}</div>
                  <div className="text-xs text-zinc-400">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
