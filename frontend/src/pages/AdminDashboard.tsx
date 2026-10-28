export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">BanglaBazar Admin</span>
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600">Visit Storefront</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border p-6 bg-white">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          <div className="rounded-xl border p-6 bg-white">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold mt-2">৳0.00</p>
          </div>
          <div className="rounded-xl border p-6 bg-white">
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          <div className="rounded-xl border p-6 bg-white">
            <h3 className="text-lg font-semibold">Customers</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}