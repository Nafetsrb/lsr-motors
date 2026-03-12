const statusConfig = {
  DEPOSITED:   { label: 'Déposée',        bg: 'bg-stone-100',   text: 'text-stone-600' },
  DIAGNOSED:   { label: 'Diagnostiquée',  bg: 'bg-orange-100',  text: 'text-orange-700' },
  IN_PROGRESS: { label: 'En cours',       bg: 'bg-blue-100',    text: 'text-blue-700' },
  COMPLETED:   { label: 'Terminée',       bg: 'bg-green-100',   text: 'text-green-700' },
  READY:       { label: 'Prête',          bg: 'bg-emerald-100', text: 'text-emerald-700' },
  DELIVERED:   { label: 'Récupérée',      bg: 'bg-gray-100',    text: 'text-gray-500' },
}

export function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const c = statusConfig[status] ?? { label: status, bg: 'bg-gray-100', text: 'text-gray-600' }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}
