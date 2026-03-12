'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ClientNav() {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-bold text-lg tracking-tight text-zinc-900">🏍️ LSR Motors</span>
        <span className="text-xs text-zinc-400">Mon espace</span>
      </header>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 flex md:hidden">
        <Link
          href="/suivi"
          className={cn(
            'flex-1 flex flex-col items-center justify-center py-2 text-xs gap-1 transition-colors',
            pathname.startsWith('/suivi')
              ? 'text-zinc-900 font-semibold'
              : 'text-zinc-400 hover:text-zinc-700'
          )}
        >
          <ClipboardList size={20} />
          <span>Suivi de ma moto</span>
        </Link>
      </nav>
    </>
  )
}
