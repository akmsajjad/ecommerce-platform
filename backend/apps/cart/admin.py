from django.contrib import admin
from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'session_key', 'subtotal', 'item_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__email', 'session_key']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'variant', 'quantity', 'total_price']
    list_filter = ['created_at']
    search_fields = ['product__name', 'cart__user__email']