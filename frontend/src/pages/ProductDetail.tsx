import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { useCartStore } from '@/stores/cartStore'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    api.get(`/products/${slug}/`).then((res) => {
      setProduct(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
          <a href="/" className="btn-primary text-sm px-6 py-2">Back to Home</a>
        </div>
      </div>
    )
  }

  const isOnSale = !!product.sale_price
  const discount = isOnSale
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price || '0')) / parseFloat(product.regular_price)) * 100)
    : 0
  const inStock = product.stock_quantity > 0

  const variants = product.variants || []

  return (
    <div className="bg-white">
      <nav className="border-b border-gray-100 bg-white">
        <div className="container-custom px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
            </li>
            <li><span>/</span></li>
            <li><a href="/products" className="hover:text-primary-600 transition-colors">Products</a></li>
            <li><span>/</span></li>
            <li><span className="text-gray-900 font-medium">{product.name}</span></li>
          </ol>
        </div>
      </nav>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isOnSale && (
                <Badge variant="destructive" className="absolute top-4 left-4 z-10">
                  -{discount}%
                </Badge>
              )}
              <Badge variant="primary" className="absolute top-4 right-4 z-10">
                {product.is_new ? 'New Arrival' : 'Best Seller'}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i - 1)}
                  className={`h-20 w-full rounded-xl overflow-hidden border-2 ${
                    activeImage === i - 1 ? 'border-primary-600' : 'border-transparent hover:border-gray-300'
                  } transition-all duration-200 cursor-pointer`}
                >
                  <div className="h-full w-full bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1">
                <Badge variant={product.stock_quantity < 10 ? 'warning' : 'success'} size="sm" className="mb-3">
                  {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">
                  {product.category_name || 'Category'}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {product.short_description || product.description || 'Premium quality product available at BanglaBazar.'}
                </p>
              </div>
            </div>

            <Card padding="lg" className="border-0 shadow-sm bg-gray-50">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">৳{product.effective_price}</span>
                {isOnSale && (
                  <span className="text-lg text-destructive line-through font-medium">৳{product.regular_price}</span>
                )}
                {isOnSale && (
                  <Badge variant="destructive" className="ml-2">
                    Save ৳{parseFloat(product.regular_price) - parseFloat(product.sale_price || '0')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Truck className="h-4 w-4 text-success-600" />
                  Free delivery on orders over ৳999
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-primary-600" />
                  100% authentic products
                </span>
              </div>

              {variants.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Select Variant</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          selectedVariant === variant.id
                            ? 'bg-primary-50 border-primary-600 text-primary-600 shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="block text-gray-500 text-xs mb-1">SKU: {variant.sku}</span>
                        <span className="block">{variant.attributes.size || 'M'} / {variant.attributes.color || 'Default'}</span>
                        <span className="block text-xs text-gray-400 mt-1">Stock: {variant.stock_quantity}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    <span>-</span>
                  </button>
                  <span className="px-4 py-2 text-sm font-medium border-x border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  disabled={!inStock || quantity > product.stock_quantity}
                  onClick={() => {
                    addItem({
                      id: Date.now(),
                      product: product.id,
                      variant: selectedVariant || undefined,
                      product_name: product.name,
                      sku: selectedVariant ? variants.find((v) => v.id === selectedVariant)?.sku || product.sku : product.sku,
                      unit_price: product.effective_price,
                      quantity,
                      total_price: (parseFloat(product.effective_price) * quantity).toFixed(2),
                    })
                    navigate('/cart')
                  }}
                >
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline" size="lg" disabled={!inStock}>
                  Buy Now
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <span>Have a question?</span>
                </span>
                <a href="/contact" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  Contact Us
                </a>
              </div>
            </Card>

            <Card padding="md" className="border-0 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                  🚚
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Delivered within 2-3 business days</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="Card-base p-4">
                <div className="h-48 bg-gray-100 overflow-hidden mb-4">
                  <div className="w-full h-full bg-gray-200"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Related Product {i}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">৳1,299.00</span>
                  <span className="text-sm text-destructive line-through">৳1,499.00</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 text-primary-600 border-primary-100">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}