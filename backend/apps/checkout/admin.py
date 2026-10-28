from django.contrib import admin
from .models import Order, OrderItem, OrderStatusHistory


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'customer', 'grand_total', 'payment_status', 'fulfillment_status', 'payment_method', 'created_at']
    list_filter = ['payment_status', 'fulfillment_status', 'payment_method', 'created_at']
    search_fields = ['order_number', 'customer__email']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product_name', 'sku', 'unit_price', 'quantity', 'total_price']
    search_fields = ['product_name', 'sku', 'order__order_number']


@admin.register(OrderStatusHistory)
class OrderStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['order', 'old_status', 'new_status', 'changed_by', 'created_at']
    list_filter = ['new_status', 'created_at']