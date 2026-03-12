import { ClientNav } from '@/components/layout/client-nav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <ClientNav />
      <main className="pt-14">
        <div className="max-w-lg mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
