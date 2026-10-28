import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">Manage customer orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Order #</th>
                  <th className="pb-3 font-medium text-gray-500">Customer</th>
                  <th className="pb-3 font-medium text-gray-500">Total</th>
                  <th className="pb-3 font-medium text-gray-500">Payment</th>
                  <th className="pb-3 font-medium text-gray-500">Fulfillment</th>
                  <th className="pb-3 font-medium text-gray-500">Date</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">BB00000{i}</td>
                    <td className="py-4">customer{i}@example.com</td>
                    <td className="py-4 font-medium">৳{2499 * i}.00</td>
                    <td className="py-4">
                      <Badge variant={i % 2 === 0 ? 'primary' : 'secondary'} size="sm">
                        {i % 2 === 0 ? 'Paid' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={i === 3 ? 'primary' : 'outline'} size="sm">
                        {i === 3 ? 'Delivered' : 'Processing'}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-gray-500">2026-10-{28 - i}</td>
                    <td className="py-4 text-right">
                      <Button size="sm">View</Button>
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