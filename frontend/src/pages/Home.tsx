import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = [
  { name: "Men's Fashion", slug: 'fashion', count: 1200, color: 'from-blue-500 to-indigo-600' },
  { name: "Women's Fashion", slug: 'fashion', count: 1500, color: 'from-pink-500 to-rose-600' },
  { name: 'Electronics', slug: 'electronics', count: 800, color: 'from-purple-500 to-violet-600' },
  { name: 'Home & Living', slug: 'home-living', count: 600, color: 'from-green-500 to-emerald-600' },
  { name: 'Beauty & Care', slug: 'beauty', count: 400, color: 'from-orange-500 to-amber-600' },
  { name: 'Groceries', slug: 'groceries', count: 300, color: 'from-red-500 to-rose-600' },
]

const promoBanners = [
  {
    title: 'Fashion Flash Sale',
    subtitle: 'Up to 50% off on all clothing',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    link: '/products?category=fashion',
  },
  {
    title: 'Electronics Deals',
    subtitle: 'Latest gadgets at best prices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    link: '/products?category=electronics',
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products/?is_featured=true').then((res) => {
      setProducts(res.data.results || res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="relative overflow-hidden">
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-bangla-100 rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl lg:max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-gray-100 text-primary-600 text-sm font-medium mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-success-500 animate-pulse"></span>
              Express delivery across all Bangladesh divisions
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-slide-up">
              Shop the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-bangla-600">
                Best of Bangladesh
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Discover quality products from electronics to fashion, home essentials to groceries — all at unbeatable prices with cash on delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/products'}>
                Shop Now <span className="ml-2">→</span>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/products'}>
                View Offers
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promoBanners.map((banner, i) => (
              <div
                key={i}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => window.location.assign(banner.link)}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <Badge variant="outline" className="text-white border-white/30">{banner.title}</Badge>
                  <h3 className="text-2xl font-bold text-white mt-2">{banner.subtitle}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-gray-500">Explore our diverse product categories</p>
            </div>
            <a href="/categories" className="text-sm font-medium text-primary-600 flex items-center gap-1 hover:text-primary-700 transition-colors">
              View all <span className="text-xs">→</span>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`/products?category=${cat.slug}`}
                className="group relative h-32 rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-30 group-hover:opacity-60"></div>
                <div className="relative z-10 p-5">
                  <span className="text-sm font-medium text-white">{cat.name}</span>
                  <p className="text-xs text-gray-300">{cat.count}+ items</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500">Handpicked favorites for you</p>
            </div>
            <a href="/products" className="text-sm font-medium text-primary-600 flex items-center gap-1 hover:text-primary-700 transition-colors">
              See all <span className="text-xs">→</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-pulse h-48 w-full max-w-lg rounded-xl bg-gray-200" />
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="Card-base p-5 group">
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
                    {product.sale_price && (
                      <Badge variant="destructive" className="absolute top-3 left-3 z-10">
                        -{Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)}%
                      </Badge>
                    )}
                    <Badge variant="primary" className="absolute top-3 right-3 z-10">
                      {product.is_new ? 'New' : 'Popular'}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <a href={`/products/${product.slug}`} className="block">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">{product.category_name || 'Category'}</p>
                    </a>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">৳{product.effective_price}</span>
                      {product.sale_price && (
                        <span className="text-sm text-destructive line-through">৳{product.regular_price}</span>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 text-primary-600 hover:bg-primary-50 border-primary-100" disabled={product.stock_quantity === 0}>
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                <span>🚚</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over ৳999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success-50 flex items-center justify-center text-success-600">
                <span>🔄</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Easy Returns</h4>
                <p className="text-xs text-gray-500">15-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning-50 flex items-center justify-center text-warning-600">
                <span>💳</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Secure Payment</h4>
                <p className="text-xs text-gray-500">COD, bKash, Nagad, SSLCommerz</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary-50 flex items-center justify-center text-secondary-600">
                <span>📞</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">24/7 Support</h4>
                <p className="text-xs text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}