import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LSR Motors',
  description: 'Gestion de garage moto',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={geist.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
