import { Plus, Phone, Bike } from 'lucide-react'

const mockClients = [
  { id: '1', name: 'Thomas Dupont', email: 'thomas.dupont@email.com', phone: '06 12 34 56 78', motorcycles: 2, activeInterventions: 1, joined: 'Jan. 2025' },
  { id: '2', name: 'Marie Leblanc', email: 'marie.leblanc@email.com', phone: '07 23 45 67 89', motorcycles: 1, activeInterventions: 1, joined: 'Mar. 2025' },
  { id: '3', name: 'Lucas Martin', email: 'lucas.martin@email.com', phone: '06 34 56 78 90', motorcycles: 1, activeInterventions: 1, joined: 'Juin 2025' },
  { id: '4', name: 'Sophie Bernard', email: 'sophie.bernard@email.com', phone: '07 45 67 89 01', motorcycles: 1, activeInterventions: 1, joined: 'Nov. 2024' },
  { id: '5', name: 'Romain Petit', email: 'romain.petit@email.com', phone: '06 56 78 90 12', motorcycles: 3, activeInterventions: 0, joined: 'Fév. 2024' },
  { id: '6', name: 'Claire Moreau', email: 'claire.moreau@email.com', phone: '07 67 89 01 23', motorcycles: 1, activeInterventions: 0, joined: 'Août 2025' },
]

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function getAvatarColor(name: string) {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700',
    'bg-amber-100 text-amber-700',
  ]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export default function ClientsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0C0A09]">Clients</h1>
          <p className="text-[#78716C] mt-1">{mockClients.length} clients enregistrés</p>
        </div>
        <button className="flex items-center gap-2 bg-[#CA8A04] text-white hover:bg-[#A16207] rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150">
          <Plus className="w-4 h-4" />
          Nouveau client
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClients.map((client) => {
          const avatarColors = getAvatarColor(client.name)
          return (
            <div
              key={client.id}
              className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColors}`}>
                  {getInitials(client.name)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-[#0C0A09] truncate">{client.name}</div>
                  <div className="text-xs text-[#78716C] truncate">{client.email}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#78716C]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#78716C]">
                  <Bike className="w-3.5 h-3.5" />
                  <span>{client.motorcycles} moto{client.motorcycles > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8E5E0] flex items-center justify-between">
                {client.activeInterventions > 0 ? (
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                    {client.activeInterventions} intervention active
                  </span>
                ) : (
                  <span className="text-xs text-[#78716C]">Aucune intervention active</span>
                )}
                <span className="text-xs text-[#78716C]">Depuis {client.joined}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
