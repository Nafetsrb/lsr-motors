import { StatusBadge } from '@/components/ui/status-badge'
import { ArrowLeft, Bike, CheckCircle, Clock, Circle, ImageIcon } from 'lucide-react'
import Link from 'next/link'

type InterventionStatus = 'DEPOSITED' | 'DIAGNOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY' | 'DELIVERED'
type TaskStatus = 'DONE' | 'IN_PROGRESS' | 'PENDING'

// Données visibles client
const mockSuivi = {
  id: '1',
  moto: { brand: 'Honda', model: 'CBR 600', year: 2019, licensePlate: 'AB-123-CD' },
  status: 'IN_PROGRESS' as InterventionStatus,
  description: 'Révision complète + changement freins avant et arrière.',
  estimatedCost: 450,
  createdAt: '12 mars 2026',
  tasks: [
    { id: '1', title: 'Révision complète 20 000 km', status: 'DONE' as TaskStatus, isVisible: true },
    { id: '2', title: 'Remplacement plaquettes de frein avant', status: 'IN_PROGRESS' as TaskStatus, isVisible: true },
    { id: '3', title: 'Remplacement plaquettes de frein arrière', status: 'PENDING' as TaskStatus, isVisible: true },
  ],
  photos: [1, 2, 3],
}

const progressSteps: { key: InterventionStatus; label: string }[] = [
  { key: 'DEPOSITED', label: 'Déposée' },
  { key: 'DIAGNOSED', label: 'Diagnostiquée' },
  { key: 'IN_PROGRESS', label: 'En cours' },
  { key: 'COMPLETED', label: 'Terminée' },
  { key: 'READY', label: 'Prête' },
]

const statusOrder: InterventionStatus[] = ['DEPOSITED', 'DIAGNOSED', 'IN_PROGRESS', 'COMPLETED', 'READY', 'DELIVERED']

const taskIcons: Record<TaskStatus, React.ReactNode> = {
  DONE:        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
  IN_PROGRESS: <Clock className="w-5 h-5 text-blue-500 shrink-0" />,
  PENDING:     <Circle className="w-5 h-5 text-[#E8E5E0] shrink-0" />,
}

export default function SuiviDetailPage({ params }: { params: { id: string } }) {
  const suivi = mockSuivi
  const currentStepIndex = statusOrder.indexOf(suivi.status)

  const visibleTasks = suivi.tasks.filter(t => t.isVisible)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href="/suivi" className="p-2 hover:bg-[#F5F4F2] rounded-lg transition-colors mt-0.5">
          <ArrowLeft className="w-5 h-5 text-[#78716C]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#0C0A09]">Détail de l&apos;intervention</h1>
          <div className="mt-1">
            <StatusBadge status={suivi.status} />
          </div>
        </div>
      </div>

      {/* Moto */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] p-4 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#F5F4F2] flex items-center justify-center">
          <Bike className="w-7 h-7 text-[#78716C]" />
        </div>
        <div>
          <p className="font-semibold text-[#0C0A09]">{suivi.moto.brand} {suivi.moto.model} {suivi.moto.year}</p>
          <p className="text-sm text-[#78716C]">{suivi.moto.licensePlate}</p>
          <p className="text-xs text-[#78716C] mt-0.5">Déposée le {suivi.createdAt}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-[#0C0A09] mb-5">Avancement</h2>
        <div className="relative">
          {/* Progress line background */}
          <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-[#E8E5E0]" />
          {/* Progress line filled */}
          <div
            className="absolute top-3.5 left-3.5 h-0.5 bg-[#CA8A04] transition-all duration-300"
            style={{ width: `${(currentStepIndex / (progressSteps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {progressSteps.map((step, index) => {
              const stepOrder = statusOrder.indexOf(step.key)
              const isDone = stepOrder < currentStepIndex
              const isCurrent = stepOrder === currentStepIndex

              return (
                <div key={step.key} className="flex flex-col items-center gap-2" style={{ minWidth: 0 }}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${
                      isDone
                        ? 'bg-[#CA8A04] border-[#CA8A04]'
                        : isCurrent
                        ? 'bg-white border-[#CA8A04]'
                        : 'bg-white border-[#E8E5E0]'
                    }`}
                  >
                    {isDone && <CheckCircle className="w-4 h-4 text-white" />}
                    {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-[#CA8A04]" />}
                  </div>
                  <span
                    className={`text-xs text-center leading-tight ${
                      isCurrent ? 'font-semibold text-[#CA8A04]' : isDone ? 'text-[#0C0A09]' : 'text-[#78716C]'
                    }`}
                    style={{ maxWidth: '52px' }}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Travaux visibles */}
      {visibleTasks.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8E5E0]">
            <h2 className="text-sm font-semibold text-[#0C0A09]">Travaux en cours</h2>
          </div>
          <div className="divide-y divide-[#E8E5E0]">
            {visibleTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 px-5 py-4">
                {taskIcons[task.status]}
                <span className={`text-sm ${task.status === 'PENDING' ? 'text-[#78716C]' : 'text-[#0C0A09]'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimation coût */}
      {suivi.estimatedCost && (
        <div className="bg-[#1C1917] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/60 font-medium">Coût estimé</p>
              <p className="text-xs text-white/40 mt-0.5">Hors surprises éventuelles</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {suivi.estimatedCost.toLocaleString('fr-FR')} <span className="text-xl text-white/70">€</span>
            </p>
          </div>
        </div>
      )}

      {/* Photos */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E5E0]">
          <h2 className="text-sm font-semibold text-[#0C0A09]">Photos</h2>
        </div>
        <div className="p-4">
          {suivi.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {suivi.photos.map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-[#F5F4F2] flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-[#E8E5E0]" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#78716C] text-center py-4">Aucune photo pour le moment.</p>
          )}
        </div>
      </div>

      {/* Contact footer */}
      <p className="text-xs text-center text-[#78716C] pb-4">
        Une question ? Appelez LSR Motors au <strong className="text-[#0C0A09]">04 XX XX XX XX</strong>
      </p>
    </div>
  )
}
