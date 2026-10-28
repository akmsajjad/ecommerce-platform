export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
            <a href="/products" className="text-sm text-gray-600 hover:text-blue-600">← Back to Products</a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 rounded-lg border bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Product Name</h1>
            <p className="text-2xl font-bold text-blue-600">৳0.00</p>
            <p className="text-gray-600">Product description goes here.</p>
            <button className="btn-primary px-6 py-3">Add to Cart</button>
          </div>
        </div>
      </main>
    </div>
  )
}