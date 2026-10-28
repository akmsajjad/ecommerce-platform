# API Documentation

## Base URL
`/api/v1/`

## Authentication
JSON Web Tokens (JWT) via `SimpleJWT`.
- Obtain token: `POST /api/v1/auth/token/`
- Refresh token: `POST /api/v1/auth/token/refresh/`
- Headers: `Authorization: Bearer <access_token>`

## Endpoints Overview

### Auth & Accounts
- `POST /api/v1/auth/register/` - Register new customer
- `GET /api/v1/accounts/profile/` - Get/update customer profile
- `GET /api/v1/accounts/addresses/` - Manage saved delivery addresses

### Catalog
- `GET /api/v1/catalog/products/` - List products (supports filtering by category, brand, price, search)
- `GET /api/v1/catalog/products/{slug}/` - Product details with variants & reviews
- `GET /api/v1/catalog/categories/` - Category tree
- `GET /api/v1/catalog/brands/` - Brand list

### Cart & Checkout
- `GET /api/v1/cart/` - View current cart items & calculated totals
- `POST /api/v1/cart/items/` - Add item to cart
- `POST /api/v1/checkout/place-order/` - Server-validated checkout transaction

### Orders & Tracking
- `GET /api/v1/orders/` - Customer order history
- `GET /api/v1/orders/{order_number}/` - Order details & tracking status
- `POST /api/v1/orders/{order_number}/cancel/` - Request order cancellation

### Coupons & Promotions
- `POST /api/v1/coupons/validate/` - Validate coupon code against cart
- `GET /api/v1/promotions/active/` - List active promotional offers

### Affiliates
- `POST /api/v1/affiliates/register/` - Apply for affiliate program
- `GET /api/v1/affiliates/dashboard/` - Affiliate stats, clicks, and earnings

### Admin Dashboard (Staff Only)
- `GET /api/v1/admin/analytics/summary/` - Key business metrics & revenue
- `GET /api/v1/admin/orders/` - Order management & status updates
- `POST /api/v1/admin/products/` - Create/update products & variants
- `GET /api/v1/admin/barcodes/lookup/` - Barcode scanner lookup
- `GET /api/v1/admin/commissions/` - Affiliate commission management & approval
