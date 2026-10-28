import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CouponRow {
  id: number
  code: string
  type: string
  value: string
  minOrder: string
  uses: string
  status: string
}

const coupons: CouponRow[] = [
  { id: 1, code: 'SAVE10', type: 'Percentage', value: '10%', minOrder: '৳500', uses: '50/100', status: 'Active' },
  { id: 2, code: 'FLAT50', type: 'Fixed', value: '৳50', minOrder: '৳200', uses: '10/50', status: 'Active' },
  { id: 3, code: 'WELCOME20', type: 'Percentage', value: '20%', minOrder: '৳1000', uses: '5/200', status: 'Expired' },
]

export default function AdminCoupons() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Coupons</h1>
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
                {coupons.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">{c.code}</td>
                    <td className="py-4">{c.type}</td>
                    <td className="py-4">{c.value}</td>
                    <td className="py-4">{c.minOrder}</td>
                    <td className="py-4">{c.uses}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-sm text-blue-600 hover:underline">Edit</button>
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