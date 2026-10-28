import { create } from 'zustand'

export interface CartItem {
  id: number
  product: number
  variant?: number
  product_name: string
  sku: string
  unit_price: string
  quantity: number
  total_price: string
  image?: string
}

export interface CartState {
  items: CartItem[]
  subtotal: string
  itemCount: number
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  setItems: (items: CartItem[]) => void
  calculateTotals: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: '0.00',
  itemCount: 0,
  addItem: (item) => {
    const items = get().items
    const existing = items.find((i) => i.product === item.product && i.variant === item.variant)
    if (existing) {
      existing.quantity += item.quantity
      existing.total_price = (parseFloat(existing.unit_price) * existing.quantity).toFixed(2)
    } else {
      items.push(item)
    }
    set({ items })
    get().calculateTotals()
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) })
    get().calculateTotals()
  },
  updateQuantity: (id, quantity) => {
    const items = get().items
    const item = items.find((i) => i.id === id)
    if (item) {
      item.quantity = quantity
      item.total_price = (parseFloat(item.unit_price) * quantity).toFixed(2)
    }
    set({ items })
    get().calculateTotals()
  },
  clearCart: () => {
    set({ items: [], subtotal: '0.00', itemCount: 0 })
  },
  setItems: (items) => {
    set({ items })
    get().calculateTotals()
  },
  calculateTotals: () => {
    const items = get().items
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    set({ subtotal, itemCount })
  },
}))