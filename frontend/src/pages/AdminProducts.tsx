import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface ProductRow {
  id: number
  name: string
  sku: string
  category: string
  brand: string
  price: string
  stock: number
  status: string
}

const products: ProductRow[] = [
  { id: 1, name: 'Men\'s Cotton T-Shirt', sku: 'TSH-001', category: 'Fashion', brand: 'BrandX', price: '৳899.00', stock: 150, status: 'Active' },
  { id: 2, name: 'Women\'s Silk Saree', sku: 'SAR-002', category: 'Fashion', brand: 'BrandY', price: '৳3,499.00', stock: 45, status: 'Active' },
  { id: 3, name: 'Smartphone X100', sku: 'PHN-003', category: 'Electronics', brand: 'TechCo', price: '৳24,999.00', stock: 23, status: 'Active' },
]

export default function AdminProducts() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <Button>Add Product</Button>
      </div>

      <Card>
        <CardHeader>
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Product</th>
                  <th className="pb-3 font-medium text-gray-500">SKU</th>
                  <th className="pb-3 font-medium text-gray-500">Category</th>
                  <th className="pb-3 font-medium text-gray-500">Brand</th>
                  <th className="pb-3 font-medium text-gray-500">Price</th>
                  <th className="pb-3 font-medium text-gray-500">Stock</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">{p.name}</td>
                    <td className="py-4">{p.sku}</td>
                    <td className="py-4">{p.category}</td>
                    <td className="py-4">{p.brand}</td>
                    <td className="py-4 font-medium">{p.price}</td>
                    <td className="py-4">{p.stock}</td>
                    <td className="py-4">
                      <Badge variant={p.status === 'Active' ? 'default' : 'secondary'}>{p.status}</Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}