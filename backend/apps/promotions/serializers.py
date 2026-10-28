from rest_framework import serializers
from .models import Coupon, PromotionRule


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount_type', 'discount_value', 'min_order_amount', 'usage_limit', 'times_used', 'start_date', 'expiry_date', 'is_active']


class CouponValidateSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)
    cart_total = serializers.DecimalField(max_digits=12, decimal_places=2)


class CouponValidationResultSerializer(serializers.Serializer):
    valid = serializers.BooleanField()
    code = serializers.CharField(max_length=50)
    discount_type = serializers.CharField(max_length=20)
    discount_value = serializers.DecimalField(max_digits=12, decimal_places=2)
    discount_amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    message = serializers.CharField()


class PromotionRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionRule
        fields = ['id', 'name', 'description', 'discount_type', 'discount_value', 'min_spend', 'min_quantity', 'start_date', 'end_date', 'is_active', 'priority']