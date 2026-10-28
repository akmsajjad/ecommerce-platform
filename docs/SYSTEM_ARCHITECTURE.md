# System Architecture

## 1. Architectural Style
BanglaBazar is built as a **Modular Monolith** using Python/Django + Django REST Framework (DRF) on the backend and React + TypeScript + Vite + Tailwind CSS on the frontend. 

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                │
│       Storefront (Port 5173) │ Admin Dashboard (Port 5173)  │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │ REST API / JWT               │ REST API / JWT
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Django Modular Monolith)          │
│                                                             │
│  apps/accounts    apps/catalog     apps/inventory   apps/cart│
│  apps/checkout    apps/orders      apps/payments    apps/shipping│
│  apps/promotions  apps/affiliates  apps/marketing   apps/analytics│
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌───────────────────────┐         ┌───────────────────────────┐
│     MySQL Database    │         │ Local Media File Storage  │
└───────────────────────┘         └───────────────────────────┘
```

## 2. Backend App Structure (`backend/apps/`)
- `accounts`: User authentication, JWT tokens, customer profiles, staff roles, and permissions.
- `catalog`: Categories, brands, products, variants, attributes, and product images.
- `inventory`: Stock ledger, warehouse adjustments, stock reservations, and low-stock triggers.
- `cart`: Shopping cart items, guest-to-user cart merging, and server-side validation.
- `checkout`: Address management, shipping fee calculation, tax, and order placement transactions.
- `orders`: Order lifecycle management, status history, invoices, and packing slips.
- `payments`: Payment gateway abstraction (COD, SSLCommerz, bKash, Nagad), verification, and webhook handlers.
- `shipping`: Courier provider abstraction (Pathao, Steadfast, RedX, Mock), zone rules, and shipment tracking.
- `promotions`: Advanced discount rules (Buy X Get Y, bundle pricing, threshold discounts).
- `affiliates`: Referral link tracking, commission calculation, approval, and payout records.
- `marketing`: Email campaigns, customer segmentation, newsletters, and notification records.
- `reviews`: Product ratings, verified purchase reviews, and moderation.
- `analytics`: Dashboard metrics, sales summaries, and report exports.
- `content`: Homepage banners, CMS pages, navigation links, and store settings.
- `audit`: Immutable audit logs for sensitive administrative actions.

## 3. Frontend Architecture (`frontend/src/`)
- `components/ui`: Shadcn-ui inspired accessible primitives (buttons, dialogs, dropdowns, tables, etc.).
- `components/storefront`: Storefront layout, header, footer, product cards, category sliders.
- `components/admin`: Admin sidebar, metrics widgets, data tables, charts.
- `features/`: Domain-specific components and hooks (auth, products, cart, checkout, orders, promotions, affiliates).
- `services/`: Axios API clients with request/response interceptors for JWT auth and error handling.
- `stores/`: Zustand state management for cart, auth session, and UI preferences.
- `types/`: TypeScript interfaces and type definitions matching backend serializers.
