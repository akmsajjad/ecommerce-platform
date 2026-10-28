import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PackageCheck,
  Ticket,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowRight,
  CreditCard,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/admin/inventory', icon: PackageCheck },
  { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { name: 'Affiliates', href: '/admin/affiliates', icon: Users },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-bangla-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Bangla<span className="text-primary-600">Bazar</span> Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-600 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                window.location.href = item.href
              }}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                window.location.pathname === item.href
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-6">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span>Visit Storefront</span>
          </button>
        </div>
      </aside>

      <div className={`flex-1 transition-transform duration-300 ${sidebarOpen ? 'pl-72' : ''}`}>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white border-b border-gray-200 px-6 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-gray-600 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 text-sm text-gray-600">
              <span>Admin</span>
              <span className="w-px h-4 bg-gray-300"></span>
              <span className="font-medium text-gray-900">Super Admin</span>
            </div>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Orders', value: '1,234', change: '+12%', trend: 'up', icon: ShoppingCart, color: 'bg-primary-50 text-primary-600' },
    { label: 'Revenue', value: '৳45,820', change: '+8%', trend: 'up', icon: CreditCard, color: 'bg-success-50 text-success-600' },
    { label: 'Total Products', value: '89', change: '+5%', trend: 'up', icon: Package, color: 'bg-bangla-50 text-bangla-600' },
    { label: 'Total Customers', value: '567', change: '+15%', trend: 'up', icon: Users, color: 'bg-warning-50 text-warning-600' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your store performance</p>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} hover>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center {stat.color}">
                <stat.icon className="h-5 w-5" />
              </div>
              <Badge variant="success" size="sm">{stat.change}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card hover>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                      #{100 + i}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order #{1000 + i}</p>
                      <p className="text-xs text-gray-500">Customer Name</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">৳2,499.00</p>
                    <Badge variant="primary" size="sm">Shipped</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center text-warning-600 text-sm">
                      !
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product Name {i}</p>
                      <p className="text-xs text-gray-500">Only {i * 5} left</p>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">Low Stock</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                      #{i}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Popular Product {i}</p>
                      <p className="text-xs text-gray-500">124 sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">৳1,299.00</p>
                    <span className="h-4 w-4 text-success-600">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}