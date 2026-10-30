from rest_framework import serializers
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    unit_price = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variant', 'quantity', 'unit_price', 'total_price']
        read_only_fields = ['id', 'unit_price', 'total_price']

    def get_unit_price(self, obj):
        return str(obj.unit_price)

    def get_total_price(self, obj):
        return str(obj.total_price)


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'subtotal', 'item_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'subtotal', 'item_count', 'created_at', 'updated_at']

    def get_subtotal(self, obj):
        return str(obj.subtotal)

    def get_item_count(self, obj):
        return obj.item_count