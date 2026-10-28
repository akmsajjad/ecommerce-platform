import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface OrderRow {
  id: number
  orderNumber: string
  customer: string
  total: string
  paymentStatus: string
  fulfillmentStatus: string
  date: string
}

const orders: OrderRow[] = [
  { id: 1, orderNumber: 'BB000001', customer: 'customer@example.com', total: '৳2,499.00', paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', date: '2026-10-28' },
  { id: 2, orderNumber: 'BB000002', customer: 'user2@example.com', total: '৳899.00', paymentStatus: 'Pending', fulfillmentStatus: 'Pending', date: '2026-10-27' },
  { id: 3, orderNumber: 'BB000003', customer: 'user3@example.com', total: '৳5,998.00', paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', date: '2026-10-26' },
]

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
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
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">{o.orderNumber}</td>
                    <td className="py-4">{o.customer}</td>
                    <td className="py-4 font-medium">{o.total}</td>
                    <td className="py-4">
                      <Badge variant={o.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{o.paymentStatus}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={o.fulfillmentStatus === 'Delivered' ? 'default' : 'outline'}>{o.fulfillmentStatus}</Badge>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{o.date}</td>
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