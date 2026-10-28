from django.contrib import admin
from .models import HomepageBanner, StoreSetting


@admin.register(HomepageBanner)
class HomepageBannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'display_order', 'is_active', 'created_at']
    list_filter = ['is_active']


@admin.register(StoreSetting)
class StoreSettingAdmin(admin.ModelAdmin):
    list_display = ['key', 'updated_at']
    search_fields = ['key']