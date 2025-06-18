'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { USER_BTAG_DICT } from '@/lib/btags'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, TrendingUp } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data?.user) {
      setError('Credenciais inválidas.')
      setLoading(false)
      return
    }

    const user = data.user
    const uuid = user.id
    const btag = USER_BTAG_DICT[uuid]

    if (!btag) {
      setError('Este usuário não possui uma btag registrada.')
      setLoading(false)
      return
    }

    // Armazena sessão local
    localStorage.setItem('affiliate_session', JSON.stringify({
      user: {
        id: uuid,
        email: user.email,
        btag,
      },
      expires: Date.now() + 24 * 60 * 60 * 1000,
    }))

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Card className="w-full max-w-md bg-white/80 shadow-lg backdrop-blur-sm border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Affiliate Dashboard
            </CardTitle>
            <CardDescription className="text-gray-600">
              Entre com seu e-mail para visualizar seu painel.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Entrando...</> : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}