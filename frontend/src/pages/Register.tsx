import { useState } from 'react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Mail, Lock, User, Phone } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/register/', { email, username, password, phone })
      login(res.data.access, res.data.refresh, res.data.user)
      window.location.href = '/'
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-bangla-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create account</h2>
            <p className="text-gray-500">Join BanglaBazar today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              leftIcon={<User className="h-4 w-4 text-gray-400" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+8801XXXXXXXXX"
              leftIcon={<Phone className="h-4 w-4 text-gray-400" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="p-3 rounded-lg bg-destructive-50 border border-destructive-100 text-destructive text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-4">Already have an account?</p>
            <a href="/login" className="btn-primary text-sm px-6 py-2">
              Sign in <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}