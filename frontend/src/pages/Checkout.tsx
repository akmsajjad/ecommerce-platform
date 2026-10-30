import { useState } from 'react'
import api from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ShieldCheck, Phone, Clock } from 'lucide-react'

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive your order', icon: Wallet },
  { id: 'sslcommerz', name: 'SSLCommerz', description: 'Credit/Debit Card, Mobile Banking', icon: ShieldCheck },
  { id: 'bkash', name: 'bKash', description: 'Pay with bKash mobile wallet', icon: Phone },
  { id: 'nagad', name: 'Nagad', description: 'Pay with Nagad mobile wallet', icon: Phone },
]

export default function Checkout() {
  const [formData, setFormData] = useState({
    recipient_name: '',
    phone: '',
    division: '',
    district: '',
    upazila: '',
    address_line: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const subtotal = '1500.00'
  const shippingCharge = 60.00
  const total = parseFloat(subtotal) + shippingCharge - couponDiscount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/checkout/place-order/', {
        shipping_address: formData,
        payment_method: paymentMethod,
        coupon_code: couponCode || undefined,
      })
      window.location.href = `/orders/${res.data.order_number}`
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
        cart_total: subtotal,
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
    <div className="bg-white min-h-screen">
      <div className="container-custom py-8">
        <div className="flex items-center gap-2 mb-8">
          <a href="/cart" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
            ← Back to Cart
          </a>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Recipient Name"
                    value={formData.recipient_name}
                    onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="Division"
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    required
                  />
                  <Input
                    label="District"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    required
                  />
                  <Input
                    label="Upazila / Thana"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    required
                  />
                  <Input
                    label="Address Line"
                    placeholder="House, Road, Area"
                    value={formData.address_line}
                    onChange={(e) => setFormData({ ...formData, address_line: e.target.value })}
                    required
                  />
                  {error && (
                    <div className="p-3 rounded-lg bg-destructive-50 border border-destructive-100 text-destructive text-sm">
                      {error}
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </form>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Have a coupon?</h2>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={validateCoupon}>
                    Apply
                  </Button>
                </div>
                {couponMessage && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    couponDiscount > 0
                      ? 'bg-success-50 border border-success-100 text-success-700'
                      : 'bg-destructive-50 border border-destructive-100 text-destructive-700'
                  }`}>
                    {couponMessage}
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">৳{shippingCharge.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-success-600">-৳{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Tax</span>
                    <span>৳0.00</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
                    <span>Total to Pay</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          paymentMethod === method.id
                            ? 'bg-primary-50 border-primary-200 text-primary-700 shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <method.icon className="h-5 w-5 text-gray-400" />
                          <div>
                            <span className="text-sm font-medium">{method.name}</span>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {method.id === 'cod' ? 'Free' : 'Online'}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ShieldCheck className="h-4 w-4 text-primary-600" />
                      <span>100% secure payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-primary-600" />
                      <span>Delivered in 2-3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Wallet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="1" width="20" height="22" rx="2" ry="2"></rect>
      <path d="M16 7H8"></path>
      <path d="M12 17h10"></path>
      <line x1="8" y1="21" x2="3" y2="3"></line>
    </svg>
  )
}