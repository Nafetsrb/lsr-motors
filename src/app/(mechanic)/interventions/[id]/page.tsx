import { StatusBadge } from '@/components/ui/status-badge'
import { ArrowLeft, Bike, User, Wrench, FileText, StickyNote, ImageIcon, ChevronRight } from 'lucide-react'
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
  PENDING:     { label: 'À faire',  bg: 'bg-stone-100',  text: 'text-stone-600' },
  IN_PROGRESS: { label: 'En cours', bg: 'bg-blue-100',   text: 'text-blue-700' },
  DONE:        { label: 'Fait',     bg: 'bg-green-100',  text: 'text-green-700' },
}

export default function InterventionDetailPage({ params }: { params: { id: string } }) {
  const inv = mockIntervention

  const totalLabor = inv.tasks.reduce((acc, t) => acc + (t.laborCost ?? 0), 0)
  const totalParts = inv.tasks.reduce((acc, t) => acc + t.parts.reduce((a, p) => a + p.price * p.qty, 0), 0)

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex items-start gap-3">
        <Link
          href="/interventions"
          className="p-2 hover:bg-[#F5F4F2] rounded-lg transition-colors mt-0.5"
        >
          <ArrowLeft className="w-5 h-5 text-[#78716C]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1">
            <Link href="/interventions" className="hover:text-[#1C1917] transition-colors">Interventions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0C0A09]">{inv.moto.brand} {inv.moto.model}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-[#0C0A09]">
              {inv.moto.brand} {inv.moto.model} {inv.moto.year}
            </h1>
            <StatusBadge status={inv.status} />
          </div>
          <p className="text-sm text-[#78716C] mt-1">{inv.moto.licensePlate} · {inv.moto.color} · {inv.mileage.toLocaleString('fr-FR')} km</p>
        </div>
      </div>

      {/* Client & Moto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-[#78716C]" />
            <span className="text-sm font-semibold text-[#0C0A09]">Client</span>
          </div>
          <p className="font-semibold text-[#0C0A09]">{inv.client.name}</p>
          <p className="text-sm text-[#78716C] mt-1">{inv.client.phone}</p>
          <p className="text-sm text-[#78716C]">{inv.client.email}</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Bike className="w-4 h-4 text-[#78716C]" />
            <span className="text-sm font-semibold text-[#0C0A09]">Moto</span>
          </div>
          <p className="font-semibold text-[#0C0A09]">{inv.moto.brand} {inv.moto.model} {inv.moto.year}</p>
          <p className="text-sm text-[#78716C] mt-1">{inv.moto.licensePlate} · {inv.moto.color}</p>
          <p className="text-sm text-[#78716C]">{inv.mileage.toLocaleString('fr-FR')} km</p>
        </div>
      </div>

      {/* Description */}
      {inv.description && (
        <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#78716C]" />
            <span className="text-sm font-semibold text-[#0C0A09]">Description</span>
          </div>
          <p className="text-sm text-[#78716C]">{inv.description}</p>
        </div>
      )}

      {/* Tasks */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E8E5E0]">
          <Wrench className="w-4 h-4 text-[#78716C]" />
          <span className="text-sm font-semibold text-[#0C0A09]">Tâches</span>
        </div>
        <div className="divide-y divide-[#E8E5E0]">
          {inv.tasks.map((task) => {
            const ts = taskStatusConfig[task.status]
            return (
              <div key={task.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#0C0A09]">{task.title}</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ts.bg} ${ts.text}`}>
                        {ts.label}
                      </span>
                    </div>
                    {task.parts.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {task.parts.map((part, i) => (
                          <li key={i} className="text-xs text-[#78716C]">
                            · {part.name} × {part.qty} — {part.price} €
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {task.laborCost !== undefined && (
                    <span className="text-sm font-semibold text-[#0C0A09] shrink-0">{task.laborCost} €</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pièces summary */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm">
        <div className="px-5 py-4 border-b border-[#E8E5E0]">
          <span className="text-sm font-semibold text-[#0C0A09]">Récapitulatif pièces</span>
        </div>
        <div className="px-5 py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#78716C] uppercase tracking-wide">
                <th className="text-left pb-2">Pièce</th>
                <th className="text-center pb-2">Qté</th>
                <th className="text-right pb-2">Prix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5E0]">
              {inv.tasks.flatMap(t => t.parts).map((part, i) => (
                <tr key={i}>
                  <td className="py-2 text-[#0C0A09]">{part.name}</td>
                  <td className="py-2 text-center text-[#78716C]">{part.qty}</td>
                  <td className="py-2 text-right text-[#0C0A09] font-medium">{part.price} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estimation coût */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0C0A09] mb-4">Estimation du coût</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#78716C]">Main d&apos;œuvre</span>
            <span className="font-medium text-[#0C0A09]">{totalLabor} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#78716C]">Pièces</span>
            <span className="font-medium text-[#0C0A09]">{totalParts} €</span>
          </div>
          <div className="border-t border-[#E8E5E0] pt-2 flex justify-between">
            <span className="font-semibold text-[#0C0A09]">Total estimé</span>
            <span className="font-bold text-[#0C0A09] text-lg">{totalLabor + totalParts} €</span>
          </div>
        </div>
      </div>

      {/* Médias */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E8E5E0]">
          <ImageIcon className="w-4 h-4 text-[#78716C]" />
          <span className="text-sm font-semibold text-[#0C0A09]">Photos</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-[#F5F4F2] flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-[#E8E5E0]" />
              </div>
            ))}
            <button className="aspect-square rounded-lg border-2 border-dashed border-[#E8E5E0] flex items-center justify-center text-[#78716C] hover:border-[#CA8A04] hover:text-[#CA8A04] transition-colors">
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notes internes */}
      <div className="bg-white rounded-xl border border-[#E8E5E0] shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E8E5E0]">
          <StickyNote className="w-4 h-4 text-[#78716C]" />
          <span className="text-sm font-semibold text-[#0C0A09]">Notes internes</span>
        </div>
        <div className="p-5 space-y-3">
          {inv.notes.map((note) => (
            <div key={note.id} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="text-sm text-[#0C0A09]">{note.content}</p>
              <p className="text-xs text-[#78716C] mt-1">Non visible par le client</p>
            </div>
          ))}
          <button className="text-sm text-[#CA8A04] hover:underline font-medium">
            + Ajouter une note
          </button>
        </div>
      </div>
    </div>
  )
}
