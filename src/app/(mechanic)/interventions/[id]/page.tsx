import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Bike, User, Wrench, FileText } from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockIntervention = {
  id: '1',
  client: { name: 'Thomas Dupont', phone: '06 12 34 56 78', email: 'thomas.dupont@email.com' },
  moto: { brand: 'Honda', model: 'CBR 600', year: 2019, licensePlate: 'AB-123-CD', color: 'Rouge' },
  status: 'IN_PROGRESS' as const,
  mileage: 24500,
  description: 'Révision complète + changement freins avant et arrière. Client signale également un bruit au niveau de la chaîne.',
  estimatedCost: 450,
  totalCost: null,
  createdAt: '12/03/2026',
  tasks: [
    { id: '1', title: 'Révision complète 20 000 km', status: 'DONE' as const, laborCost: 120, parts: [{ name: 'Filtre à huile', qty: 1, price: 15 }, { name: 'Huile moteur 4L', qty: 1, price: 38 }] },
    { id: '2', title: 'Remplacement plaquettes de frein avant', status: 'IN_PROGRESS' as const, laborCost: 60, parts: [{ name: 'Plaquettes Brembo', qty: 1, price: 45 }] },
    { id: '3', title: 'Remplacement plaquettes de frein arrière', status: 'PENDING' as const, laborCost: 45, parts: [] },
    { id: '4', title: 'Vérification et réglage chaîne', status: 'PENDING' as const, laborCost: 30, parts: [] },
  ],
  notes: [
    { id: '1', content: 'Client disponible en semaine après 17h pour restitution.', isVisible: false },
  ],
}

const taskStatusConfig = {
  PENDING: { label: 'À faire', className: 'bg-zinc-100 text-zinc-600' },
  IN_PROGRESS: { label: 'En cours', className: 'bg-blue-100 text-blue-600' },
  DONE: { label: 'Fait', className: 'bg-green-100 text-green-600' },
}

export default function InterventionDetailPage({ params }: { params: { id: string } }) {
  const inv = mockIntervention

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/interventions" className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-zinc-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Intervention #{params.id}</h1>
          <div className="mt-0.5">
            <StatusBadge status={inv.status} />
          </div>
        </div>
      </div>

      {/* Client & Moto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User size={15} className="text-zinc-500" /> Client
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-semibold text-zinc-900">{inv.client.name}</p>
            <p className="text-sm text-zinc-500">{inv.client.phone}</p>
            <p className="text-sm text-zinc-500">{inv.client.email}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Bike size={15} className="text-zinc-500" /> Moto
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-semibold text-zinc-900">{inv.moto.brand} {inv.moto.model} {inv.moto.year}</p>
            <p className="text-sm text-zinc-500">{inv.moto.licensePlate} · {inv.moto.color}</p>
            <p className="text-sm text-zinc-500">{inv.mileage.toLocaleString('fr-FR')} km</p>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {inv.description && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText size={15} className="text-zinc-500" /> Description
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-zinc-600">{inv.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Tasks */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Wrench size={15} className="text-zinc-500" /> Tâches
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {inv.tasks.map((task, idx) => (
            <div key={task.id}>
              {idx > 0 && <Separator className="mb-3" />}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-zinc-900">{task.title}</span>
                    <Badge className={taskStatusConfig[task.status].className}>
                      {taskStatusConfig[task.status].label}
                    </Badge>
                  </div>
                  {task.parts.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {task.parts.map((part, i) => (
                        <li key={i} className="text-xs text-zinc-500">
                          · {part.name} × {part.qty} — {part.price} €
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {task.laborCost !== undefined && (
                  <span className="text-sm font-medium text-zinc-700 shrink-0">{task.laborCost} €</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Costs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Coût estimé</span>
            <span className="font-semibold">{inv.estimatedCost ? `${inv.estimatedCost} €` : '—'}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600 mt-1">
            <span>Coût total</span>
            <span className="font-semibold">{inv.totalCost ? `${inv.totalCost} €` : '—'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Notes (internes) */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-500">Notes internes</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {inv.notes.map((note) => (
            <div key={note.id} className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
              <p className="text-sm text-zinc-700">{note.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
