import { MechanicNav } from '@/components/layout/mechanic-nav'

export default function MechanicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <MechanicNav />
      {/* Offset for desktop sidebar */}
      <main className="pb-20 md:pb-0 md:pl-56 pt-0">
        {children}
      </main>
    </div>
  )
}
