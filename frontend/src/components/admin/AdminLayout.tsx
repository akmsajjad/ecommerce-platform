import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Menu, X, ChevronRight } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: 'layout-dashboard' },
  { name: 'Products', href: '/admin/products', icon: 'package' },
  { name: 'Orders', href: '/admin/orders', icon: 'shopping-cart' },
  { name: 'Inventory', href: '/admin/inventory', icon: 'package-check' },
  { name: 'Coupons', href: '/admin/coupons', icon: 'ticket' },
  { name: 'Affiliates', href: '/admin/affiliates', icon: 'users' },
  { name: 'Settings', href: '/admin/settings', icon: 'settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">BanglaBazar Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <nav className="mt-4 px-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                navigate(item.href)
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 hover:text-blue-600"
            >
              <span className="w-5 text-center">{getIcon(item.icon)}</span>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600">
            <span className="w-5 text-center">←</span>
            Visit Storefront
          </button>
        </div>
      </aside>

      <div className={`flex-1 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'pl-64' : ''}`}>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-gray-600 sm:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Admin User</span>
          </div>
        </header>
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

function getIcon(name: string) {
  const icons: Record<string, string> = {
    'layout-dashboard': '📊',
    'package': '📦',
    'shopping-cart': '🛒',
    'package-check': '📋',
    'ticket': '🎫',
    'users': '👥',
    'settings': '⚙️',
  }
  return icons[name] || '●'
}