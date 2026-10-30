import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminAffiliates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-sm text-gray-500">Manage affiliate partners and commissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Affiliate Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Name</th>
                  <th className="pb-3 font-medium text-gray-500">Referral Code</th>
                  <th className="pb-3 font-medium text-gray-500">Commission Rate</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500">Earnings</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">Partner {i}</td>
                    <td className="py-4">REF{i}2026</td>
                    <td className="py-4">{i * 5}%</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${i !== 2 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {i !== 2 ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 font-medium">৳{1000 * i}.00</td>
                    <td className="py-4 text-right">
                      <button className="text-sm text-primary-600 hover:underline">View</button>
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