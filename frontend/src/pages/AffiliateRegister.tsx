import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function AffiliateRegister() {
  const [referralCode, setReferralCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/affiliates/register/', { referral_code: referralCode })
      setSuccess('Affiliate application submitted successfully! We will review and approve your application.')
      setReferralCode('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Affiliate Program</CardTitle>
          <CardDescription>Join our affiliate network and earn commissions on referrals.</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-100">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="e.g. SAJJAD2026"
              required
            />
            <p className="text-xs text-gray-500">
              Share your referral code with friends. Earn commission when they make a purchase.
            </p>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Apply for Affiliate Program'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-center">Already have an account?</p>
          <Button variant="link" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}