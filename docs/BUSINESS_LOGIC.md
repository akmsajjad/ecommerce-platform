# Business Logic & Workflow Specifications

## 1. Currency & Financial Calculations
- All monetary values are calculated in BDT (৳) using fixed-precision decimals.
- Order subtotal = Sum of (unit_price * quantity) for all items.
- Discount total = Sum of applicable coupon discounts and promotional rule deductions.
- Grand total = Subtotal - Discount total + Shipping charge + Tax (if configured).

## 2. Checkout & Inventory Reservation
- When a customer places an order, a database transaction starts.
- Stock availability is verified against `ProductVariant` or `Product`.
- Stock quantities are decremented immediately upon successful order creation.
- If payment fails (for online gateways) or order is cancelled, stock is restored according to cancellation policies.

## 3. Affiliate Attribution & Commission Rules
- When a visitor arrives via `?ref=CODE`, the affiliate code is stored in a secure cookie/session for 30 days.
- When an order is placed, the attributed affiliate is recorded on the Order.
- Commissions are calculated as a percentage of eligible product revenue (excluding shipping and taxes).
- Commissions remain in `pending` status until the order reaches `delivered` status and passes return window checks.
- If an order is returned or refunded, commissions are automatically reversed.

## 4. Promotion & Coupon Engine
- Coupons have strict usage limits (global and per-customer) and date validity.
- Promotional rules apply automatically when cart items match condition criteria (e.g. minimum quantity, category match).
- Conflicting promotions are resolved via priority ordering.
