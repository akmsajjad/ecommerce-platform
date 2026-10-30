from django.contrib import admin
from .models import Shipment


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ['tracking_number', 'order', 'courier_name', 'status', 'shipping_cost', 'created_at']
    list_filter = ['courier_name', 'status', 'created_at']
    search_fields = ['tracking_number', 'order__order_number']