import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'LSR Motors',
  description: 'Gestion de garage moto',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={dmSans.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
