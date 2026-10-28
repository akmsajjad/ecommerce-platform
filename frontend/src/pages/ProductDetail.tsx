import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/services/api'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/products/${slug}/`).then((res) => {
      setProduct(res.data)
      setLoading(false)
    })
  }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
          <a href="/products" className="text-sm text-gray-600 hover:text-blue-600">← Back to Products</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg border p-4 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400">{product.name} Image</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Badge variant="outline">{product.status}</Badge>
              </div>
              <span className="text-2xl font-bold text-blue-600">৳{product.effective_price}</span>
            </div>
            <p className="text-gray-600">{product.short_description || product.description}</p>
            <div className="flex gap-2">
              <Button size="lg" className="flex-1" onClick={() => {}}>
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">Buy Now</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}