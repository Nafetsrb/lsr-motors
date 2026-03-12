import Link from 'next/link'
import { StatusBadge } from '@/components/ui/status-badge'
import { ChevronRight, Bike, Plus } from 'lucide-react'

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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0C0A09]">Interventions</h1>
          <p className="text-[#78716C] mt-1">{mockInterventions.length} interventions au total</p>
        </div>
        <button className="flex items-center gap-2 bg-[#CA8A04] text-white hover:bg-[#A16207] rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150">
          <Plus className="w-4 h-4" />
          Nouvelle intervention
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par client, moto, immatriculation…"
          className="w-full border border-[#E8E5E0] rounded-lg px-4 py-2.5 text-sm bg-white placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#CA8A04]/30 focus:border-[#CA8A04] transition-all duration-150"
        />
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] divide-y divide-[#E8E5E0] shadow-sm">
        {mockInterventions.map((item) => (
          <Link
            key={item.id}
            href={`/interventions/${item.id}`}
            className="flex items-center gap-4 p-4 hover:bg-[#FAFAF9] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#F5F4F2] flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5 text-[#78716C]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-[#0C0A09] text-sm">{item.client}</span>
                <StatusBadge status={item.status} />
              </div>
              <div className="text-xs text-[#78716C] mt-0.5">
                {item.moto} {item.year} · {item.licensePlate}
              </div>
              <div className="text-xs text-[#78716C]/70 mt-0.5 truncate">{item.description}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-[#78716C]">{item.date}</div>
                <div className="text-xs text-[#78716C]/70">{item.mileage.toLocaleString('fr-FR')} km</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#E8E5E0]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
