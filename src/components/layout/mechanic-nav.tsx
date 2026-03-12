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
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#1C1917] text-white fixed left-0 top-0 z-50">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-xl font-bold tracking-tight">
            LSR <span className="text-[#CA8A04]">Motors</span>
          </span>
          <p className="text-xs text-white/40 mt-1">Espace Mécanicien</p>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-white/10 text-white border-l-2 border-[#CA8A04] pl-[10px]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom user indicator */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white/80">M</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-white truncate">Mécanicien</div>
              <div className="text-xs text-white/40 truncate">lsr-motors.fr</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1C1917] border-t border-white/10 flex justify-around py-2 z-50 md:hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-1 text-xs transition-all duration-150',
                isActive ? 'text-[#CA8A04]' : 'text-white/50 hover:text-white/80'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
