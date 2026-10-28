import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.get('/products/').then((res) => {
      setProducts(res.data.results || res.data)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Shop
              </a>
              <a href="/cart" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Cart
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="h-40 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{p.name}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <p className="text-2xl font-bold text-blue-600">৳{p.effective_price}</p>
              <Button variant="outline" size="sm" onClick={() => {}}>
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}