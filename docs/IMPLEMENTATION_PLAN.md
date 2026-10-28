# Implementation Plan

## Phase 1: Foundation & Setup
- Initialize Django project structure (`backend/config`, `backend/apps`).
- Configure MySQL database connection with SQLite fallback/development mode.
- Set up Django REST Framework, JWT authentication, and CORS.
- Initialize React + TypeScript + Vite frontend with Tailwind CSS and routing.
- Create OpenAPI schema documentation setup.

## Phase 2: Core Commerce (Catalog, Cart & Checkout)
- Build Catalog models (Category, Brand, Product, Variant, Image) and API endpoints.
- Implement Cart models and endpoints.
- Build Checkout transaction engine with inventory deduction and order creation.
- Build storefront product listing, details, cart drawer, and checkout flow.

## Phase 3: Promotions, Coupons & Affiliates
- Implement Coupon and Promotion Rule models and validation engine.
- Build Affiliate registration, referral cookie tracking, and commission calculation logic.
- Integrate coupon and promotion display on storefront checkout.

## Phase 4: Admin Dashboard & Operations
- Build custom React Admin Dashboard with analytics overview.
- Implement product, variant, category, and inventory management screens.
- Implement barcode generator and scanner lookup feature.
- Build order management, status updates, invoice printing, and mock courier shipment creation.

## Phase 5: Notifications, Marketing & Polish
- Build email notification logging and marketing campaign modules.
- Implement customer order history and profile management.
- Seed realistic demo data for categories, products, coupons, and affiliates.
- Verify end-to-end demo flows.
