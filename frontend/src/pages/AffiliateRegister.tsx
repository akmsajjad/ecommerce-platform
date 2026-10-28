import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import api from '@/services/api'

export default function AffiliateRegister() {
  const [referralCode, setReferralCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Affiliate Program</h2>
            <p className="text-gray-500">Join our affiliate network and earn commissions on referrals.</p>
          </div>
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
          <div className="mt-6 pt-4 border-t border-gray-100 text-center space-y-2">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <a href="/login" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Sign in
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}