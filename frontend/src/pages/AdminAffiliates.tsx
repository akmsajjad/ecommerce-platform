import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AffiliateRow {
  id: number
  name: string
  referralCode: string
  commissionRate: string
  status: string
  earnings: string
}

const affiliates: AffiliateRow[] = [
  { id: 1, name: 'John Doe', referralCode: 'JOHN2026', commissionRate: '5%', status: 'Approved', earnings: '৳1,250.00' },
  { id: 2, name: 'Jane Smith', referralCode: 'JANE2026', commissionRate: '5%', status: 'Pending', earnings: '৳0.00' },
  { id: 3, name: 'Bob Wilson', referralCode: 'BOB2026', commissionRate: '10%', status: 'Approved', earnings: '৳3,400.00' },
]

export default function AdminAffiliates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Affiliates</h1>
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
                {affiliates.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium">{a.name}</td>
                    <td className="py-4">{a.referralCode}</td>
                    <td className="py-4">{a.commissionRate}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${a.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium">{a.earnings}</td>
                    <td className="py-4 text-right">
                      <button className="text-sm text-blue-600 hover:underline">View</button>
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