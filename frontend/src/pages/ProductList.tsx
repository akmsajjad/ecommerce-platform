export default function ProductList() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
            <a href="/" className="text-sm text-gray-600 hover:text-blue-600">← Back to Home</a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-lg border p-6 bg-white">
              <div className="h-40 rounded-lg bg-gray-200 mb-4" />
              <h3 className="text-lg font-semibold">Product {i}</h3>
              <p className="text-gray-600">৳0.00</p>
              <button className="mt-4 w-full btn-primary">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}