from django.contrib import admin
from .models import Coupon, PromotionRule


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_type', 'discount_value', 'is_active', 'times_used', 'start_date', 'expiry_date']
    list_filter = ['discount_type', 'is_active', 'start_date', 'expiry_date']
    search_fields = ['code']


@admin.register(PromotionRule)
class PromotionRuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'discount_type', 'discount_value', 'is_active', 'priority', 'start_date', 'end_date']
    list_filter = ['discount_type', 'is_active']
    search_fields = ['name']