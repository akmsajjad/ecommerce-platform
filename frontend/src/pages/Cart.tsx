import { useEffect, useState } from 'react'
import api from '@/services/api'
import { useCartStore } from '@/stores/cartStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Trash2, Truck, ShieldCheck } from 'lucide-react'

export default function Cart() {
  const { items, subtotal, itemCount, setItems, removeItem, clearCart } = useCartStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/cart/').then((res) => {
      setItems(res.data.items || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [setItems])

  const shippingCharge = 60.00
  const total = parseFloat(subtotal) + shippingCharge

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom py-8">
        <div className="flex items-center gap-2 mb-8">
          <a href="/products" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
            ← Continue Shopping
          </a>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <a href="/products" className="btn-primary text-sm px-6 py-2">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
              <div className="pt-6 border-t border-gray-100">
                <Button variant="outline" size="sm" onClick={() => clearCart()} className="w-full text-destructive hover:bg-destructive-50 border-destructive-100">
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-gray-900">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">৳{shippingCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Tax</span>
                      <span>৳0.00</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
                      <span>Total</span>
                      <span>৳{total.toFixed(2)}</span>
                    </div>
                    <Button size="lg" className="w-full" onClick={() => window.location.href = '/checkout'}>
                      Proceed to Checkout
                    </Button>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ShieldCheck className="h-4 w-4 text-primary-600" />
                      <span>100% secure payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Truck className="h-4 w-4 text-primary-600" />
                      <span>Free delivery on orders over ৳999</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface CartItemProps {
  item: any
  onRemove: () => void
}

function CartItemCard({ item, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  return (
    <Card className="flex flex-col sm:flex-row items-center gap-4 p-5">
      <div className="relative h-40 sm:h-auto sm:w-40 bg-gray-100 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80')] bg-cover bg-center"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.product_name}</h3>
          <button onClick={onRemove} className="text-gray-400 hover:text-destructive transition-colors p-1">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">SKU: {item.sku}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">৳{item.total_price}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <span>-</span>
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <span>+</span>
        </button>
      </div>
    </Card>
  )
}