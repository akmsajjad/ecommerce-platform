# Database Schema Specification

## Overview
The database uses MySQL with InnoDB engine, utf8mb4 collation, and strict mode. All financial amounts are stored using `Decimal(12, 2)`. Foreign keys enforce referential integrity with appropriate `ON DELETE` cascades or protections.

## Core Models & Relationships

### 1. Accounts & Profiles
- **User**: Custom Django AbstractUser (email login primary, phone, role, is_verified).
- **CustomerProfile**: OneToOne with User (loyalty_points, marketing_consent).
- **Address**: ManyToOne with User (recipient_name, phone, division, district, upazila, address_line, is_default).
- **StaffRole**: Role definitions and permission matrices.

### 2. Catalog & Inventory
- **Category**: Self-referencing hierarchical categories (name, slug, parent, image, is_active).
- **Brand**: Brand name, slug, logo, description.
- **Product**: name, slug, sku, barcode, short_description, description, category, brand, regular_price, sale_price, cost_price, stock_quantity, low_stock_threshold, status, is_featured, is_new, weight.
- **ProductVariant**: product, sku, barcode, attributes (JSON/relational), price_override, stock_quantity.
- **ProductImage**: product, image_file, alt_text, is_primary, display_order.
- **StockMovement**: product, variant, change_type, quantity_change, reference_id, notes, created_by.

### 3. Cart & Checkout
- **Cart**: user (nullable for guest), session_key, created_at.
- **CartItem**: cart, product, variant, quantity.
- **Order**: order_number, customer, shipping_address (snapshot), billing_address, subtotal, discount_total, shipping_charge, tax_total, grand_total, payment_status, fulfillment_status, payment_method, courier_provider, tracking_id, affiliate, coupon, notes.
- **OrderItem**: order, product, variant, product_name, sku, unit_price, quantity, total_price, discount_allocated.
- **OrderStatusHistory**: order, old_status, new_status, notes, changed_by.

### 4. Promotions, Coupons & Affiliates
- **PromotionRule**: name, description, discount_type, discount_value, min_spend, min_quantity, start_date, end_date, is_active.
- **Coupon**: code, discount_type, discount_value, min_order_amount, usage_limit, times_used, start_date, expiry_date, is_active.
- **AffiliateProfile**: user, referral_code, commission_rate, status (pending, approved, suspended), payout_details.
- **ReferralVisit**: affiliate, visitor_ip, landing_page, converted_order, created_at.
- **AffiliateCommission**: affiliate, order, base_amount, commission_rate, commission_amount, status (pending, approved, paid, reversed).
- **PayoutRecord**: affiliate, amount, payment_method, transaction_reference, status.

### 5. Payments, Shipping & Content
- **PaymentTransaction**: order, gateway_name, transaction_id, amount, currency, status, raw_response.
- **Shipment**: order, courier_name, tracking_number, status, shipping_cost, COD_amount, response_data.
- **HomepageBanner**: title, subtitle, image, link_url, display_order, is_active.
- **StoreSetting**: key, value, description.
- **AuditLog**: user, action, ip_address, details, timestamp.
