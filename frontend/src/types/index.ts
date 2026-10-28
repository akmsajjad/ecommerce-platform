export interface Product {
  id: number
  name: string
  slug: string
  sku: string
  barcode?: string
  short_description?: string
  description?: string
  category: number
  category_name?: string
  brand: number
  brand_name?: string
  regular_price: string
  sale_price?: string
  cost_price?: string
  stock_quantity: number
  low_stock_threshold: number
  status: string
  is_featured: boolean
  is_new: boolean
  weight?: string
  images: ProductImage[]
  variants: ProductVariant[]
}

export interface ProductImage {
  id: number
  image_file?: string
  alt_text?: string
  is_primary: boolean
  display_order: number
}

export interface ProductVariant {
  id: number
  sku: string
  barcode?: string
  attributes: Record<string, string>
  price_override?: string
  stock_quantity: number
}

export interface Category {
  id: number
  name: string
  slug: string
  parent?: number
  image?: string
  is_active: boolean
  children?: Category[]
}

export interface Brand {
  id: number
  name: string
  slug: string
  logo?: string
  description?: string
}

export interface Address {
  id: number
  recipient_name: string
  phone: string
  division: string
  district: string
  upazila: string
  address_line: string
  is_default: boolean
}

export interface Order {
  order_number: string
  customer: number
  subtotal: string
  discount_total: string
  shipping_charge: string
  tax_total: string
  grand_total: string
  payment_status: string
  fulfillment_status: string
  payment_method: string
  items: OrderItem[]
  created_at: string
}

export interface OrderItem {
  id: number
  product_name: string
  sku: string
  unit_price: string
  quantity: number
  total_price: string
}