'use client'
import { signOut } from 'next-auth/react'

export function ClientNav() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#E8E5E0] z-50">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-lg font-bold text-[#1C1917]">
          LSR <span className="text-[#CA8A04]">Motors</span>
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  )
}
