import { ClientNav } from '@/components/layout/client-nav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <ClientNav />
      <main className="pb-20">
        {children}
      </main>
    </div>
  )
}
