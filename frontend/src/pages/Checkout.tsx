import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Checkout() {
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [upazila, setUpazila] = useState('')
  const [addressLine, setAddressLine] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const shippingAddress = {
        recipient_name: recipientName,
        phone,
        division,
        district,
        upazila,
        address_line: addressLine,
      }
      const res = await api.post('/checkout/place-order/', {
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        coupon_code: couponCode || undefined,
      })
      navigate(`/orders/${res.data.order_number}`)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  const validateCoupon = async () => {
    if (!couponCode) return
    try {
      const res = await api.post('/coupons/validate/', {
        code: couponCode,
        cart_total: '0',
      })
      if (res.data.valid) {
        setCouponDiscount(parseFloat(res.data.discount_amount))
        setCouponMessage(res.data.message)
      } else {
        setCouponDiscount(0)
        setCouponMessage(res.data.message)
      }
    } catch {
      setCouponMessage('Coupon validation failed')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
          <a href="/cart" className="text-sm text-gray-600 hover:text-blue-600">← Back to Cart</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Recipient Name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                />
                <Input
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  required
                />
                <Input
                  label="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
                <Input
                  label="Upazila"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  required
                />
                <Input
                  label="Address Line"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  required
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <Button variant="outline" size="sm" onClick={validateCoupon}>
                      Apply
                    </Button>
                  </div>
                  {couponMessage && (
                    <p className={`text-sm ${couponDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  {['cod', 'sslcommerz', 'bkash', 'nagad'].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      {method.toUpperCase()}
                    </label>
                  ))}
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Placing order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}