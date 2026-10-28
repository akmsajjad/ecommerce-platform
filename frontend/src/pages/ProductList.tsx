import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '@/services/api'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Grid, List } from 'lucide-react'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const category = searchParams.get('category') || ''
  const brand = searchParams.get('brand') || ''
  const search = searchParams.get('search') || ''
  const is_featured = searchParams.get('is_featured') || ''
  const is_new = searchParams.get('is_new') || ''
  const minPrice = searchParams.get('min_price') || ''
  const maxPrice = searchParams.get('max_price') || ''
  const sort = searchParams.get('sort') || 'featured'

  useEffect(() => {
    const params: Record<string, string> = {}
    if (category) params.category = category
    if (brand) params.brand = brand
    if (search) params.search = search
    if (is_featured) params.is_featured = is_featured
    if (is_new) params.is_new = is_new
    if (minPrice) params.min_price = minPrice
    if (maxPrice) params.max_price = maxPrice
    if (sort) params.sort = sort

    api.get('/products/', { params }).then((res) => {
      setProducts(res.data.results || res.data)
      setTotalCount(res.data.count || res.data.length || 0)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [category, brand, search, is_featured, is_new, minPrice, maxPrice, sort])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Products</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0 space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={is_featured === 'true'}
                        onChange={(e) => {
                          const sp = new URLSearchParams(searchParams)
                          if (e.target.checked) sp.set('is_featured', 'true')
                          else sp.delete('is_featured')
                          setSearchParams(sp)
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-primary-600">Featured Products</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={is_new === 'true'}
                        onChange={(e) => {
                          const sp = new URLSearchParams(searchParams)
                          if (e.target.checked) sp.set('is_new', 'true')
                          else sp.delete('is_new')
                          setSearchParams(sp)
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-primary-600">New Arrivals</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Min"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      const sp = new URLSearchParams(searchParams)
                      sp.set('min_price', e.target.value)
                      setSearchParams(sp)
                    }}
                    className="h-10 px-3 text-sm"
                  />
                  <Input
                    label="Max"
                    placeholder="99999"
                    value={maxPrice}
                    onChange={(e) => {
                      const sp = new URLSearchParams(searchParams)
                      sp.set('max_price', e.target.value)
                      setSearchParams(sp)
                    }}
                    className="h-10 px-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Featured', value: 'featured' },
                    { label: 'Price: Low to High', value: 'price_asc' },
                    { label: 'Price: High to Low', value: 'price_desc' },
                    { label: 'Newest First', value: 'newest' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const sp = new URLSearchParams(searchParams)
                        sp.set('sort', option.value)
                        setSearchParams(sp)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sort === option.value
                          ? 'bg-primary-50 text-primary-600 font-medium border border-primary-100'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{totalCount} results</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Showing {products.length}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="Card-base p-6 h-[420px] flex flex-col">
                    <div className="h-64 bg-gray-200 animate-pulse rounded-t-xl overflow-hidden"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-full"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
                        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
                      </div>
                      <div className="h-40 bg-gray-200 animate-pulse rounded mt-4 flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductCardList key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const isOnSale = !!product.sale_price
  const discount = isOnSale
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price || '0')) / parseFloat(product.regular_price)) * 100)
    : 0

  return (
    <Card hover className="group">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
        {isOnSale && (
          <Badge variant="destructive" className="absolute top-3 left-3 z-10">
            -{discount}%
          </Badge>
        )}
        <Badge variant="primary" className="absolute top-3 right-3 z-10">
          {product.is_new ? 'New' : 'Popular'}
        </Badge>
        <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="icon" className="text-white bg-black/60 hover:bg-black/80 border-0 w-9 h-9">
            <span className="text-white text-[10px]">♡</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white bg-black/60 hover:bg-black/80 border-0 w-9 h-9">
            <span className="text-white text-[10px]">→</span>
          </Button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={product.stock_quantity < 10 ? 'warning' : 'success'} size="sm">
            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <a href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-3">{product.category_name || 'Category'}</p>
        </a>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">৳{product.effective_price}</span>
          {isOnSale && (
            <span className="text-sm text-destructive line-through">৳{product.regular_price}</span>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4 text-primary-600 hover:bg-primary-50 border-primary-100" disabled={product.stock_quantity === 0}>
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  )
}

function ProductCardList({ product }: ProductCardProps) {
  const isOnSale = !!product.sale_price
  const discount = isOnSale
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price || '0')) / parseFloat(product.regular_price)) * 100)
    : 0

  return (
    <Card className="flex flex-col sm:flex-row items-center gap-4 p-5">
      <div className="relative h-48 sm:h-auto sm:w-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80')] bg-cover bg-center"></div>
        {isOnSale && (
          <Badge variant="destructive" className="absolute top-2 left-2 z-10">
            -{discount}%
          </Badge>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <Badge variant={product.stock_quantity < 10 ? 'warning' : 'success'} size="sm">
            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <a href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
          <p className="text-xs text-gray-400 mb-2">{product.category_name || 'Category'}</p>
        </a>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">৳{product.effective_price}</span>
          {isOnSale && (
            <span className="text-sm text-destructive line-through">৳{product.regular_price}</span>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-primary-600 hover:bg-primary-50 border-primary-100"
        disabled={product.stock_quantity === 0}
        onClick={() => {}}
      >
        {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </Card>
  )
}