import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight, Phone } from 'lucide-react'

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

export default function ClientsPage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Clients</h1>
          <p className="text-sm text-zinc-500 mt-1">{mockClients.length} clients enregistrés</p>
        </div>
        <button className="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 transition-colors">
          + Nouveau
        </button>
      </div>

      <div className="space-y-2">
        {mockClients.map((client) => (
          <Card key={client.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-zinc-200 text-zinc-700 text-sm font-semibold">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-zinc-900 text-sm">{client.name}</div>
                  <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Phone size={10} />
                    {client.phone}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {client.motorcycles} moto{client.motorcycles > 1 ? 's' : ''} ·{' '}
                    {client.activeInterventions > 0
                      ? <span className="text-blue-600 font-medium">{client.activeInterventions} intervention active</span>
                      : <span>Aucune intervention active</span>
                    }
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-zinc-400">{client.joined}</span>
                  <ChevronRight size={16} className="text-zinc-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
