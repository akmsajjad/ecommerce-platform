import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminInventory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">Manage stock levels and movements</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Product</th>
                  <th className="pb-3 font-medium text-gray-500">SKU</th>
                  <th className="pb-3 font-medium text-gray-500">Current Stock</th>
                  <th className="pb-3 font-medium text-gray-500">Low Stock Threshold</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">Product {i}</td>
                    <td className="py-4">SKU-00{i}</td>
                    <td className="py-4">{100 - i * 20}</td>
                    <td className="py-4">10</td>
                    <td className="py-4">
                      <Badge variant={i === 2 ? 'destructive' : 'primary'} size="sm">
                        {i === 2 ? 'Low Stock' : 'OK'}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Badge variant="outline" size="sm">Adjust Stock</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Barcode Scanner Lookup</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-6">Scan or enter a barcode to look up product information</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="Scan barcode..."
                className="w-full sm:w-80 h-11 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button>Lookup</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}