import { MechanicNav } from '@/components/layout/mechanic-nav'

export default function MechanicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <MechanicNav />
      {/* Offset pour sidebar desktop + padding bottom mobile nav */}
      <main className="md:ml-64 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
