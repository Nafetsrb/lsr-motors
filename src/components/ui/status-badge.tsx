import { Badge } from '@/components/ui/badge'

const statusConfig = {
  DEPOSITED: { label: 'Déposée', className: 'bg-slate-100 text-slate-700' },
  DIAGNOSED: { label: 'Diagnostiquée', className: 'bg-orange-100 text-orange-700' },
  IN_PROGRESS: { label: 'En cours', className: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Terminée', className: 'bg-green-100 text-green-700' },
  READY: { label: 'Prête', className: 'bg-emerald-100 text-emerald-700' },
  DELIVERED: { label: 'Récupérée', className: 'bg-gray-100 text-gray-500' },
}

export function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status] ?? { label: status, className: '' }
  return <Badge className={config.className}>{config.label}</Badge>
}
