from django.contrib import admin
from .models import User, CustomerProfile, Address


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'role', 'is_verified', 'is_staff', 'date_joined']
    list_filter = ['role', 'is_verified', 'is_staff', 'is_active']
    search_fields = ['email', 'username', 'phone']


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'loyalty_points', 'marketing_consent', 'created_at']
    list_filter = ['marketing_consent']
    search_fields = ['user__email']


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['recipient_name', 'user', 'division', 'district', 'upazila', 'is_default']
    list_filter = ['division', 'district', 'is_default']
    search_fields = ['recipient_name', 'user__email']