'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Email ou mot de passe incorrect.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1917]">
            LSR <span className="text-[#CA8A04]">Motors</span>
          </h1>
          <p className="text-[#78716C] mt-2 text-sm">Connectez-vous à votre espace</p>
        </div>

        {/* Card formulaire */}
        <div className="bg-white rounded-xl border border-[#E8E5E0] p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1C1917] hover:bg-[#292524] text-white rounded-lg h-10 font-medium transition-all duration-150"
              >
                {loading ? 'Connexion…' : 'Se connecter'}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-[#78716C] mt-6">LSR Motors — Espace sécurisé</p>
      </div>
    </div>
  )
}
