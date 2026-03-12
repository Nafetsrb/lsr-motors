import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Bike, CheckCircle, Clock, Circle } from 'lucide-react'
import Link from 'next/link'

// Données visibles par le client (filtrées : isVisible = true uniquement)
const mockSuivi = {
  id: '1',
  moto: { brand: 'Honda', model: 'CBR 600', year: 2019, licensePlate: 'AB-123-CD' },
  status: 'IN_PROGRESS' as const,
  description: 'Révision complète + changement freins avant et arrière.',
  estimatedCost: 450,
  createdAt: '12/03/2026',
  tasks: [
    { id: '1', title: 'Révision complète 20 000 km', status: 'DONE' as const },
    { id: '2', title: 'Remplacement plaquettes de frein avant', status: 'IN_PROGRESS' as const },
    { id: '3', title: 'Remplacement plaquettes de frein arrière', status: 'PENDING' as const },
  ],
}

const taskIcons = {
  DONE: <CheckCircle size={16} className="text-green-500" />,
  IN_PROGRESS: <Clock size={16} className="text-blue-500" />,
  PENDING: <Circle size={16} className="text-zinc-300" />,
}

const taskLabels = {
  DONE: { label: 'Terminé', className: 'bg-green-100 text-green-600' },
  IN_PROGRESS: { label: 'En cours', className: 'bg-blue-100 text-blue-600' },
  PENDING: { label: 'À venir', className: 'bg-zinc-100 text-zinc-500' },
}

export default function SuiviDetailPage({ params }: { params: { id: string } }) {
  const suivi = mockSuivi

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/suivi" className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-zinc-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Détail de l&apos;intervention</h1>
          <div className="mt-0.5">
            <StatusBadge status={suivi.status} />
          </div>
        </div>
      </div>

      {/* Moto */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-3 bg-zinc-100 rounded-xl">
            <Bike size={22} className="text-zinc-700" />
          </div>
          <div>
            <p className="font-semibold text-zinc-900">{suivi.moto.brand} {suivi.moto.model} {suivi.moto.year}</p>
            <p className="text-sm text-zinc-500">{suivi.moto.licensePlate}</p>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-600">Description</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-zinc-700">{suivi.description}</p>
          <p className="text-xs text-zinc-400 mt-2">Déposée le {suivi.createdAt}</p>
        </CardContent>
      </Card>

      {/* Avancement des tâches */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-600">Avancement des travaux</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {suivi.tasks.map((task, idx) => (
            <div key={task.id}>
              {idx > 0 && <Separator className="mb-3" />}
              <div className="flex items-center gap-3">
                {taskIcons[task.status]}
                <span className="flex-1 text-sm text-zinc-800">{task.title}</span>
                <Badge className={taskLabels[task.status].className}>
                  {taskLabels[task.status].label}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Coût estimé */}
      {suivi.estimatedCost && (
        <Card className="border-0 shadow-sm bg-zinc-900 text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <span className="text-sm font-medium">Coût estimé</span>
            <span className="text-xl font-bold">{suivi.estimatedCost} €</span>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-center text-zinc-400 pb-4">
        Pour toute question, contactez LSR Motors au <strong>04 XX XX XX XX</strong>
      </p>
    </div>
  )
}
