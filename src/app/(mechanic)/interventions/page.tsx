import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { ChevronRight } from 'lucide-react'

type InterventionStatus = 'DEPOSITED' | 'DIAGNOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY' | 'DELIVERED'

const mockInterventions = [
  {
    id: '1',
    client: 'Thomas Dupont',
    moto: 'Honda CBR 600',
    year: 2019,
    licensePlate: 'AB-123-CD',
    status: 'IN_PROGRESS' as InterventionStatus,
    description: 'Révision complète + changement freins',
    date: '12/03/2026',
    mileage: 24500,
  },
  {
    id: '2',
    client: 'Marie Leblanc',
    moto: 'Yamaha MT-07',
    year: 2021,
    licensePlate: 'EF-456-GH',
    status: 'DIAGNOSED' as InterventionStatus,
    description: 'Problème démarrage, diagnostic effectué',
    date: '11/03/2026',
    mileage: 12300,
  },
  {
    id: '3',
    client: 'Lucas Martin',
    moto: 'Kawasaki Z900',
    year: 2020,
    licensePlate: 'IJ-789-KL',
    status: 'READY' as InterventionStatus,
    description: 'Changement chaîne et pignons',
    date: '10/03/2026',
    mileage: 31200,
  },
  {
    id: '4',
    client: 'Sophie Bernard',
    moto: 'Ducati Monster',
    year: 2018,
    licensePlate: 'MN-012-OP',
    status: 'DEPOSITED' as InterventionStatus,
    description: 'Bruit moteur anormal',
    date: '10/03/2026',
    mileage: 18900,
  },
  {
    id: '5',
    client: 'Romain Petit',
    moto: 'BMW R1250GS',
    year: 2022,
    licensePlate: 'QR-345-ST',
    status: 'COMPLETED' as InterventionStatus,
    description: 'Service 20 000 km',
    date: '08/03/2026',
    mileage: 20100,
  },
  {
    id: '6',
    client: 'Claire Moreau',
    moto: 'Triumph Street Triple',
    year: 2020,
    licensePlate: 'UV-678-WX',
    status: 'DELIVERED' as InterventionStatus,
    description: 'Réglage suspension',
    date: '05/03/2026',
    mileage: 9800,
  },
]

export default function InterventionsPage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Interventions</h1>
          <p className="text-sm text-zinc-500 mt-1">{mockInterventions.length} interventions</p>
        </div>
        <button className="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 transition-colors">
          + Nouvelle
        </button>
      </div>

      <div className="space-y-2">
        {mockInterventions.map((item) => (
          <Link key={item.id} href={`/interventions/${item.id}`}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-900 text-sm">{item.client}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="text-sm text-zinc-600 mt-0.5">
                      {item.moto} {item.year} · {item.licensePlate}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 truncate">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-zinc-400">{item.date}</div>
                      <div className="text-xs text-zinc-500">{item.mileage.toLocaleString('fr-FR')} km</div>
                    </div>
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
