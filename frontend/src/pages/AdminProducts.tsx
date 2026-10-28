import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <Button>Add Product</Button>
      </div>

      <Card>
        <CardHeader>
          <Input placeholder="Search products..." className="w-full max-w-md" />
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
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">Product {i}</td>
                    <td className="py-4">SKU-00{i}</td>
                    <td className="py-4">Fashion</td>
                    <td className="py-4">BrandX</td>
                    <td className="py-4 font-medium">৳899.00</td>
                    <td className="py-4">{100 - i * 10}</td>
                    <td className="py-4">
                      <Badge variant="primary" size="sm">Active</Badge>
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