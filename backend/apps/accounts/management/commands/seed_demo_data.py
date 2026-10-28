from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.accounts.models import CustomerProfile, Address
from apps.catalog.models import Category, Brand, Product, ProductVariant
from apps.promotions.models import Coupon
from apps.affiliates.models import AffiliateProfile
from decimal import Decimal
import random


class Command(BaseCommand):
    help = 'Seed realistic demo data for BanglaBazar'

    def handle(self, *args, **options):
        User = get_user_model()

        self.stdout.write('Seeding demo data...')

        # Create admin user
        admin_user, created = User.objects.get_or_create(
            email='admin@banglabazar.com',
            defaults={
                'username': 'admin',
                'role': 'staff',
                'is_staff': True,
                'is_superuser': True,
                'is_verified': True,
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(f'Created admin user: {admin_user.email}')

        # Create customer users
        customers = []
        for i in range(5):
            customer, created = User.objects.get_or_create(
                email=f'customer{i+1}@example.com',
                defaults={
                    'username': f'customer{i+1}',
                    'role': 'customer',
                    'is_verified': True,
                }
            )
            if created:
                customer.set_password('customer123')
                customer.save()
                CustomerProfile.objects.create(user=customer)
                Address.objects.create(
                    user=customer,
                    recipient_name=f'Customer {i+1}',
                    phone=f'+88017{random.randint(10000000, 99999999)}',
                    division='Dhaka',
                    district='Dhaka',
                    upazila='Gulshan',
                    address_line=f'House {i+1}, Road {i+1}, Gulshan',
                    is_default=True,
                )
            customers.append(customer)

        # Create categories
        categories_data = [
            {'name': 'Fashion', 'slug': 'fashion'},
            {'name': 'Electronics', 'slug': 'electronics'},
            {'name': 'Home & Living', 'slug': 'home-living'},
            {'name': 'Beauty & Personal Care', 'slug': 'beauty'},
            {'name': 'Groceries', 'slug': 'groceries'},
        ]
        categories = []
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories.append(cat)

        # Create brands
        brands_data = [
            {'name': 'BrandX', 'slug': 'brandx'},
            {'name': 'BrandY', 'slug': 'brandy'},
            {'name': 'TechCo', 'slug': 'techco'},
            {'name': 'GadgetPro', 'slug': 'gadgetpro'},
        ]
        brands = []
        for brand_data in brands_data:
            brand, created = Brand.objects.get_or_create(
                slug=brand_data['slug'],
                defaults=brand_data
            )
            brands.append(brand)

        # Create products
        products_data = [
            {'name': "Men's Cotton T-Shirt", 'sku': 'TSH-001', 'category': 'fashion', 'brand': 'brandx', 'price': '899.00', 'stock': 150, 'featured': True},
            {'name': "Women's Silk Saree", 'sku': 'SAR-002', 'category': 'fashion', 'brand': 'brandy', 'price': '3499.00', 'stock': 45, 'featured': True},
            {'name': 'Smartphone X100', 'sku': 'PHN-003', 'category': 'electronics', 'brand': 'techco', 'price': '24999.00', 'stock': 23, 'featured': True, 'new': True},
            {'name': 'Wireless Earbuds', 'sku': 'EAR-004', 'category': 'electronics', 'brand': 'gadgetpro', 'price': '2499.00', 'stock': 80, 'new': True},
            {'name': 'Cotton Bed Sheet', 'sku': 'BED-005', 'category': 'home-living', 'brand': 'brandx', 'price': '1299.00', 'stock': 60},
            {'name': 'Face Cream', 'sku': 'BEA-006', 'category': 'beauty', 'brand': 'brandy', 'price': '599.00', 'stock': 120},
            {'name': 'Basmati Rice 5kg', 'sku': 'GRO-007', 'category': 'groceries', 'brand': 'brandx', 'price': '450.00', 'stock': 200},
            {'name': 'Blender Machine', 'sku': 'APP-008', 'category': 'home-living', 'brand': 'techco', 'price': '3999.00', 'stock': 35},
        ]
        for pdata in products_data:
            category = Category.objects.get(slug=pdata['category'])
            brand = Brand.objects.get(slug=pdata['brand'])
            product, created = Product.objects.get_or_create(
                sku=pdata['sku'],
                defaults={
                    'name': pdata['name'],
                    'slug': pdata['sku'].lower(),
                    'short_description': f'High quality {pdata["name"]}',
                    'description': f'Premium {pdata["name"]} available in Bangladesh.',
                    'category': category,
                    'brand': brand,
                    'regular_price': Decimal(pdata['price']),
                    'sale_price': Decimal(str(float(pdata['price']) * 0.9)) if pdata.get('featured') else None,
                    'stock_quantity': pdata['stock'],
                    'low_stock_threshold': 10,
                    'status': 'active',
                    'is_featured': pdata.get('featured', False),
                    'is_new': pdata.get('new', False),
                    'weight': Decimal('0.500'),
                }
            )
            if created:
                ProductVariant.objects.create(
                    product=product,
                    sku=f'{pdata["sku"]}-VAR',
                    attributes={'size': 'M', 'color': 'Default'},
                    stock_quantity=pdata['stock'],
                )

        # Create coupons
        coupons_data = [
            {'code': 'WELCOME10', 'discount_type': 'percentage', 'discount_value': '10.00', 'min_order_amount': '500.00', 'usage_limit': 200},
            {'code': 'FLAT50', 'discount_type': 'fixed', 'discount_value': '50.00', 'min_order_amount': '200.00', 'usage_limit': 100},
            {'code': 'SAVE20', 'discount_type': 'percentage', 'discount_value': '20.00', 'min_order_amount': '1000.00', 'usage_limit': 50},
        ]
        from django.utils import timezone
        from datetime import timedelta
        now = timezone.now()
        for cdata in coupons_data:
            Coupon.objects.get_or_create(
                code=cdata['code'],
                defaults={
                    'discount_type': cdata['discount_type'],
                    'discount_value': Decimal(cdata['discount_value']),
                    'min_order_amount': Decimal(cdata['min_order_amount']),
                    'usage_limit': cdata['usage_limit'],
                    'times_used': 0,
                    'start_date': now,
                    'expiry_date': now + timedelta(days=30),
                    'is_active': True,
                }
            )

        # Create affiliates
        affiliate_codes = ['SAJJAD2026', 'REF2026', 'BANGLA10']
        for i, code in enumerate(affiliate_codes):
            affiliate_user = customers[i] if i < len(customers) else None
            AffiliateProfile.objects.get_or_create(
                referral_code=code,
                defaults={
                    'user': affiliate_user,
                    'commission_rate': Decimal('5.00') if i < 2 else Decimal('10.00'),
                    'status': 'approved',
                }
            )

        self.stdout.write(self.style.SUCCESS('Demo data seeded successfully!'))