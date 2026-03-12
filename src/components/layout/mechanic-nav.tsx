'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Wrench, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/interventions', label: 'Interventions', icon: Wrench },
  { href: '/clients', label: 'Clients', icon: Users },
]

export function MechanicNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-zinc-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <span className="font-bold text-lg tracking-tight">🏍️ LSR Motors</span>
        <span className="text-xs text-zinc-400">Espace Mécanicien</span>
      </header>

      {/* Bottom navigation (mobile-first) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 flex md:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-2 text-xs gap-1 transition-colors',
              pathname.startsWith(href)
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-400 hover:text-zinc-700'
            )}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen bg-zinc-900 text-white p-4 gap-1 fixed top-0 left-0">
        <div className="mb-6 mt-2">
          <span className="font-bold text-xl tracking-tight">🏍️ LSR Motors</span>
          <p className="text-xs text-zinc-400 mt-1">Espace Mécanicien</p>
        </div>
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              pathname.startsWith(href)
                ? 'bg-white text-zinc-900 font-semibold'
                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </aside>
    </>
  )
}
