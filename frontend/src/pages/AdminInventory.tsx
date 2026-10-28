import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface StockItem {
  id: number
  product: string
  sku: string
  currentStock: number
  lowStockThreshold: number
  status: string
}

const stockItems: StockItem[] = [
  { id: 1, product: 'Men\'s Cotton T-Shirt', sku: 'TSH-001', currentStock: 150, lowStockThreshold: 10, status: 'OK' },
  { id: 2, product: 'Women\'s Silk Saree', sku: 'SAR-002', currentStock: 3, lowStockThreshold: 10, status: 'Low' },
  { id: 3, product: 'Smartphone X100', sku: 'PHN-003', currentStock: 23, lowStockThreshold: 5, status: 'OK' },
]

export default function AdminInventory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
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
                {stockItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">{item.product}</td>
                    <td className="py-4">{item.sku}</td>
                    <td className="py-4">{item.currentStock}</td>
                    <td className="py-4">{item.lowStockThreshold}</td>
                    <td className="py-4">
                      <Badge variant={item.status === 'OK' ? 'default' : 'destructive'}>{item.status}</Badge>
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
            <p className="text-sm text-gray-500 mb-4">Scan or enter a barcode to look up product information</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="Scan barcode..."
                className="w-full sm:w-64 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Lookup</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}