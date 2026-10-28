export default function Cart() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-blue-600">BanglaBazar</span>
            <a href="/products" className="text-sm text-gray-600 hover:text-blue-600">← Continue Shopping</a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="rounded-lg border p-6 bg-white">
          <p className="text-gray-600">Your cart is empty.</p>
          <a href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
            Start shopping
          </a>
        </div>
      </main>
    </div>
  )
}