import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/products/').then((res) => {
      setProducts(res.data.results || res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products...</div>

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600">← Back to Home</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="h-40 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{p.name}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">৳{p.effective_price}</p>
              <Badge variant="outline" size="sm">{p.stock_quantity} in stock</Badge>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => navigate(`/products/${p.slug}`)}>
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}