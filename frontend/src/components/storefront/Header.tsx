import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ShoppingCart,
  Search,
  User,
  Menu as MenuIcon,
  X,
  Bell,
  ChevronDown,
} from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Offers', href: '/offers' },
  { name: 'New Arrivals', href: '/new-arrivals' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <>
      <div className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="border-b border-gray-100">
          <div className="container-custom flex items-center justify-between h-10 px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-primary-600 font-medium">
                <span>📦</span> Free delivery on orders over ৳999
              </span>
              <span className="flex items-center gap-1.5">📞 24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-4">
              <span>🇧🇩 BDT</span>
              <span>🇬🇧 EN</span>
            </div>
          </div>
        </div>

        <div className="container-custom flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-bangla-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-200">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Bangla<span className="text-primary-600">Bazar</span></span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, brands & more..."
                className="pl-10 pr-10 py-2.5 text-sm border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 h-8 rounded-r-lg border-0 bg-primary-600 text-white hover:bg-primary-700 focus:ring-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => window.location.href = '/wishlist'}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative group"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </Button>
            {isAuthenticated && user ? (
              <div className="relative group">
                <Button variant="ghost" size="icon" className="flex items-center gap-2 px-3">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user.email}</span>
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover:block z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive-50 transition-colors">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a href="/login" className="text-sm text-gray-600 hover:text-primary-600 font-medium">Sign in</a>
                <a href="/register" className="px-4 py-2 bg-white text-gray-700 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 whitespace-nowrap">
                  Join free
                </a>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

{mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-lg">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="container-custom px-4 py-8 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <a href="/profile" className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                    My Account
                  </a>
                  <a href="/orders" className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                    My Orders
                  </a>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-lg font-medium text-destructive hover:bg-destructive-50 rounded-xl transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <a href="/login" className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                    Sign in
                  </a>
                  <a href="/register" className="block px-4 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors text-center">
                    Join free
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export function Footer() {
  const footerLinks = {
    Shop: ['All Products', 'New Arrivals', 'Best Sellers', 'Categories', 'Brands', 'Offers & Coupons'],
    Support: ['Help Center', 'Contact Us', 'Shipping & Delivery', 'Returns & Refunds', 'Payment Methods', 'Order Tracking'],
    Company: ['About Us', 'Careers', 'Press', 'Blog', 'Terms of Service', 'Privacy Policy'],
    Account: ['My Account', 'Orders', 'Wishlist', 'Addresses', 'Payment Methods', 'Become a Seller'],
  }

  return (
    <div className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-custom py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-bangla-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Bangla<span className="text-primary-400">Bazar</span></span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3 mb-6 max-w-xs">
              Bangladesh's most trusted online marketplace. Shop electronics, fashion, home essentials, and more with cash on delivery and fast shipping across all divisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors">
                <span>f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors">
                <span>t</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors">
                <span>i</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors">
                <span>y</span>
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BanglaBazar. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>🔒 Secure payments</span>
            <span>🚚 Free shipping ৳999+</span>
            <span>🔄 Easy returns</span>
            <span>💬 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  )
}