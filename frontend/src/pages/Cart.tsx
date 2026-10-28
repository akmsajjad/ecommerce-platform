import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { useCartStore } from '@/stores/cartStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Cart() {
  const { items, subtotal, itemCount, setItems } = useCartStore()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/cart/').then((res) => {
      setItems(res.data.items || [])
      setLoading(false)
    })
  }, [setItems])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
          <a href="/products" className="text-sm text-gray-600 hover:text-blue-600">← Continue Shopping</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Button className="mt-4" onClick={() => navigate('/products')}>
              Start shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    </div>
                    <span className="font-bold">৳{item.total_price}</span>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳60.00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">৳{parseFloat(subtotal) + 60}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}