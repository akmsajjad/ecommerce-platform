from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'variant', 'product_name', 'sku', 'unit_price', 'quantity', 'total_price', 'discount_allocated']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer', 'shipping_address_snapshot', 'billing_address_snapshot',
            'subtotal', 'discount_total', 'shipping_charge', 'tax_total', 'grand_total',
            'payment_status', 'fulfillment_status', 'payment_method', 'coupon', 'affiliate',
            'notes', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'order_number', 'created_at', 'updated_at']