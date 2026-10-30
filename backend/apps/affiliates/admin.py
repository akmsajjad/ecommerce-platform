from django.contrib import admin
from .models import AffiliateProfile, ReferralVisit, AffiliateCommission, PayoutRecord


@admin.register(AffiliateProfile)
class AffiliateProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'referral_code', 'commission_rate', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['referral_code', 'user__email']


@admin.register(ReferralVisit)
class ReferralVisitAdmin(admin.ModelAdmin):
    list_display = ['affiliate', 'visitor_ip', 'converted_order', 'created_at']
    list_filter = ['created_at']
    search_fields = ['affiliate__referral_code', 'visitor_ip']


@admin.register(AffiliateCommission)
class AffiliateCommissionAdmin(admin.ModelAdmin):
    list_display = ['affiliate', 'order', 'commission_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['affiliate__referral_code', 'order__order_number']


@admin.register(PayoutRecord)
class PayoutRecordAdmin(admin.ModelAdmin):
    list_display = ['affiliate', 'amount', 'payment_method', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['affiliate__referral_code']