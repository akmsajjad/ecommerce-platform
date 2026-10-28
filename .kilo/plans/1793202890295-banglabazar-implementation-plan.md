# BanglaBazar Implementation Plan

## Project Context
- **Repo**: `D:\xampp\htdocs\ecommerce-platform`, branch `sajjad`, single commit `dd`
- **Current state**: Only `.git/` and `docs/` exist. No `backend/` or `frontend/` code yet.
- **Stack**: Python/Django + DRF backend, React + TypeScript + Vite + Tailwind frontend, MySQL database
- **Docs**: All 7 spec docs present under `docs/` (requirements, architecture, schema, business logic, API, local setup, implementation plan)
- **Prerequisites**: Python 3.10+, Node.js 18+, MySQL

---

## Phase 1: Foundation & Setup

**Goal**: Initialize Django backend and React frontend scaffolding with core config.

**Tasks**:
1. Create `backend/` directory with Django project `config/` and `apps/` package
2. Configure MySQL database with SQLite fallback for development
3. Install: Django, DRF, SimpleJWT, django-cors-headers, Pillow, python-barcode, drf-spectacular
4. Set up `settings.py`: INSTALLED_APPS, MIDDLEWARE (CORS), DATABASES, JWT auth, REST framework, drf-spectacular
5. Create `manage.py`, `urls.py`, `wsgi.py`, `asgi.py`
6. Initialize `frontend/` with Vite + React + TypeScript + Tailwind CSS
7. Install frontend deps: react-router-dom, zustand, axios, lucide-react, class-variance-authority, tailwind-merge, clsx
8. Set up `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `index.html`, `src/main.tsx`
9. Create `src/services/api.ts` (axios client with JWT interceptor)
10. Create `src/stores/` (auth, cart, UI Zustand stores)
11. Create `src/types/` (TypeScript interfaces matching backend serializers)
12. Run `makemigrations` and `migrate` to verify DB connectivity
13. Commit: `phase-1-foundation`

**Validation**:
- `python manage.py check` passes
- `npm run dev` starts frontend on port 5173
- Backend responds on port 8000
- CORS allows frontend origin

---

## Phase 2: Core Commerce (Catalog, Cart & Checkout)

**Goal**: Build catalog models/API, cart, and checkout transaction engine.

**Tasks**:
1. Backend apps: `accounts`, `catalog`, `cart`, `checkout`
2. `accounts`: Custom User (email primary), CustomerProfile, Address
3. `catalog`: Category, Brand, Product, ProductVariant, ProductImage models + serializers + viewsets + URLs
4. `cart`: Cart, CartItem models + endpoints (GET, POST items)
5. `checkout`: Address management, shipping/tax calculation, order placement transaction with stock deduction
6. Storefront: product listing, product details, cart drawer, checkout flow (guest + authenticated)
7. API endpoints per `docs/API_DOCUMENTATION.md`
8. Commit: `phase-2-core-commerce`

**Validation**:
- Product CRUD via API works
- Cart add/view works
- Checkout creates order and decrements stock
- Server-side price calculation matches frontend

---

## Phase 3: Promotions, Coupons & Affiliates

**Goal**: Implement coupon engine, promotional rules, and affiliate/referral system.

**Tasks**:
1. Backend apps: `promotions`, `affiliates`
2. `promotions`: PromotionRule, Coupon models + validation engine (percentage/fixed, BxGy, bundle, free shipping)
3. `affiliates`: AffiliateProfile, ReferralVisit, AffiliateCommission, PayoutRecord models
4. Referral attribution via `?ref=CODE` cookie/session (30-day persistence)
5. Commission calculation (percentage of eligible revenue, pending until delivered)
6. Storefront: coupon validation at checkout, affiliate registration, referral link display
7. Commit: `phase-3-promotions-affiliates`

**Validation**:
- Coupon code validation against cart works
- Referral cookie persists across sessions
- Commission calculates correctly on order placement

---

## Phase 4: Admin Dashboard & Operations

**Goal**: Build React admin dashboard with analytics and operations screens.

**Tasks**:
1. Backend apps: `orders`, `payments`, `shipping`, `inventory`, `analytics`, `content`, `audit`
2. `orders`: Order lifecycle (pending→confirmed→packed→shipped→delivered/completed/returned/cancelled), status history, invoices
3. `payments`: COD, SSLCommerz, bKash, Nagad mock flows + webhook handlers
4. `shipping`: Pathao, Steadfast, RedX mock courier + tracking
5. `inventory`: Stock ledger, low-stock alerts, barcode (Code 128) generation + scanner lookup
6. Admin UI: sidebar, metrics widgets, data tables, charts, product/variant/category/inventory management, order management, invoice printing, barcode lookup
7. Commit: `phase-4-admin-operations`

**Validation**:
- Order status transitions work end-to-end
- Barcode generation and scanner lookup functional
- Admin dashboard analytics render correctly
- Mock payment/courier flows complete

---

## Phase 5: Notifications, Marketing & Polish

**Goal**: Notification system, marketing campaigns, demo data, E2E verification.

**Tasks**:
1. Backend apps: `marketing`, `reviews`
2. `marketing`: Email campaigns, customer segmentation, notification logs
3. `reviews`: Product ratings, verified purchase reviews, moderation
4. Email/SMS/in-app notification adapter architecture
5. Customer order history and profile management
6. Seed realistic demo data (categories, products, coupons, affiliates)
7. Verify end-to-end demo flows (browse → cart → checkout → order → delivery)
8. Commit: `phase-5-notifications-polish`

**Validation**:
- All E2E demo flows pass
- Notification logging works
- Demo data loads without errors
- All API endpoints documented in `docs/API_DOCUMENTATION.md` are implemented

---

## Commit Strategy
- One commit per phase (5 total), matching the user's requirement: "every phase write a commit"
- Commit messages: `phase-1-foundation`, `phase-2-core-commerce`, `phase-3-promotions-affiliates`, `phase-4-admin-operations`, `phase-5-notifications-polish`
- Do not wait for permission between phases

---

## Risks & Open Questions
- MySQL vs SQLite: docs say MySQL with SQLite fallback; confirm which to use for dev
- Mock vs real payment gateways: docs specify sandbox/mock flows; no real API keys needed
- Barcode scanner: hardware integration vs camera-based lookup; docs mention "scanner support" ambiguously
- Frontend/backend port configuration: 5173 (frontend) and 8000 (backend) per docs