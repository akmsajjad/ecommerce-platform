import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminCoupons() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="text-sm text-gray-500">Manage discount codes and promotions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Code</th>
                  <th className="pb-3 font-medium text-gray-500">Type</th>
                  <th className="pb-3 font-medium text-gray-500">Value</th>
                  <th className="pb-3 font-medium text-gray-500">Min Order</th>
                  <th className="pb-3 font-medium text-gray-500">Uses</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">SAVE{i}0</td>
                    <td className="py-4">Percentage</td>
                    <td className="py-4">{i * 10}%</td>
                    <td className="py-4">৳500</td>
                    <td className="py-4">{i * 10}/100</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-sm text-primary-600 hover:underline">Edit</button>
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