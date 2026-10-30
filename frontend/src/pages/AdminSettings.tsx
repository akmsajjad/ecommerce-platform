import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminSettings() {
  const [storeName, setStoreName] = useState('BanglaBazar')
  const [storePhone, setStorePhone] = useState('')
  const [storeEmail, setStoreEmail] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Store configuration and preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-md">
            <Input label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            <Input label="Store Phone" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
            <Input label="Store Email" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}