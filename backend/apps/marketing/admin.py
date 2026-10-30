from django.contrib import admin
from .models import NotificationLog, EmailCampaign, CustomerSegment


@admin.register(NotificationLog)
class NotificationLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'channel', 'recipient', 'status', 'created_at']
    list_filter = ['channel', 'status', 'created_at']
    search_fields = ['recipient', 'user__email']


@admin.register(EmailCampaign)
class EmailCampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'status', 'sent_count', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'subject']


@admin.register(CustomerSegment)
class CustomerSegmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'customer_count', 'created_at']
    search_fields = ['name']