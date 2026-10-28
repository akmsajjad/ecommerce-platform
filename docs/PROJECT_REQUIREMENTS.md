# Project Requirements: E-Commerce Platform for Bangladesh ("BanglaBazar")

## 1. Executive Summary
"BanglaBazar" is a complete, production-structured, single-vendor e-commerce platform built specifically for the Bangladesh market. It provides a delightful, responsive customer storefront and a robust administrative dashboard. The platform handles localized currency (BDT ৳), local payment gateways (SSLCommerz, bKash, Nagad, Cash on Delivery), courier integrations (Pathao, Steadfast, RedX), a sophisticated discount/coupon engine, an affiliate/referral tracking system, inventory management with barcode generation/scanning, and automated customer notifications.

## 2. Core Objectives
- **Local Market Fit**: Fully tailored for Bangladeshi users with BDT currency, region/district/upazila address hierarchy, and popular local payment/shipping methods.
- **Single-Vendor Architecture**: Centralized inventory and catalog management operated by store staff with granular role-based permissions.
- **Robust Financial Integrity**: Decimal-safe pricing, immutable historical order snapshots, explicit tax/shipping breakdowns, and audited commission calculations.
- **High-Performance UI/UX**: Clean, modern React + TypeScript storefront with Tailwind CSS and shadcn-inspired components, complemented by a feature-rich Admin Dashboard.
- **Extensible Integrations**: Modular adapter architecture for payments, couriers, and notification channels (email/SMS/in-app).

## 3. Key Modules & Functional Requirements
1. **Catalog & Inventory**: Categories, brands, products, attributes, variants (size/color), stock ledger, low-stock alerts, and Code 128 barcode generation & scanner support.
2. **Cart & Checkout**: Multi-item cart, guest & authenticated checkout, server-side price calculation, address management, and order placement.
3. **Promotions & Coupons**: Rule-based promotion engine (percentage/fixed, Buy X Get Y, bundle pricing, free shipping) and coupon code validation.
4. **Affiliate & Referral System**: Referral link attribution (`?ref=...`), cookie/session persistence, commission calculation rules, approval workflows, and payout tracking.
5. **Orders & Fulfillment**: Order lifecycle management (pending -> confirmed -> packed -> shipped -> delivered -> completed / returned / cancelled), invoice/packing slip printing, and courier integration.
6. **Payments**: Abstracted payment gateway supporting COD, SSLCommerz, bKash, and Nagad sandbox/mock flows.
7. **Marketing & CRM**: Email campaign builder, customer segmentation, automated transactional notifications, product reviews, and wishlist.
8. **Administration**: Comprehensive React dashboard with analytics, sales graphs, staff role permissions, audit logs, and CMS settings.
