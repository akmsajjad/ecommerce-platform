from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from decimal import Decimal
from .models import Coupon, PromotionRule
from .serializers import CouponSerializer, CouponValidateSerializer, CouponValidationResultSerializer, PromotionRuleSerializer


class CouponViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def validate(self, request):
        serializer = CouponValidateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data['code']
        cart_total = serializer.validated_data['cart_total']

        try:
            coupon = Coupon.objects.get(code=code)
        except Coupon.DoesNotExist:
            return Response({
                'valid': False,
                'code': code,
                'discount_type': '',
                'discount_value': Decimal('0'),
                'discount_amount': Decimal('0'),
                'message': 'Invalid coupon code',
            })

        if not coupon.is_valid():
            return Response({
                'valid': False,
                'code': code,
                'discount_type': coupon.discount_type,
                'discount_value': coupon.discount_value,
                'discount_amount': Decimal('0'),
                'message': 'Coupon is expired or inactive',
            })

        if cart_total < coupon.min_order_amount:
            return Response({
                'valid': False,
                'code': code,
                'discount_type': coupon.discount_type,
                'discount_value': coupon.discount_value,
                'discount_amount': Decimal('0'),
                'message': f'Minimum order amount of ৳{coupon.min_order_amount} required',
            })

        if coupon.discount_type == 'percentage':
            discount_amount = cart_total * (coupon.discount_value / Decimal('100'))
        else:
            discount_amount = coupon.discount_value

        if discount_amount > cart_total:
            discount_amount = cart_total

        return Response({
            'valid': True,
            'code': code,
            'discount_type': coupon.discount_type,
            'discount_value': coupon.discount_value,
            'discount_amount': discount_amount,
            'message': 'Coupon applied successfully',
        })


class PromotionRuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PromotionRule.objects.filter(is_active=True)
    serializer_class = PromotionRuleSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        now = timezone.now()
        return queryset.filter(start_date__lte=now, end_date__gte=now)