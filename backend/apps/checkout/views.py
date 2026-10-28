from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import Order, OrderItem, OrderStatusHistory
from .serializers import OrderSerializer
from apps.cart.models import Cart, CartItem


class CheckoutViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        if not request.user.is_authenticated:
            return Response([])
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def place_order(self, request):
        with transaction.atomic():
            cart = self._get_cart(request)
            if not cart or cart.items.count() == 0:
                return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

            shipping_address = request.data.get('shipping_address')
            billing_address = request.data.get('billing_address', shipping_address)
            payment_method = request.data.get('payment_method', 'cod')
            coupon_code = request.data.get('coupon_code')
            affiliate_code = request.data.get('affiliate_code')
            notes = request.data.get('notes', '')

            subtotal = cart.subtotal
            discount_total = 0
            shipping_charge = 60  # Fixed BDT shipping
            tax_total = 0
            grand_total = subtotal - discount_total + shipping_charge + tax_total

            order_number = f"BB{Order.objects.count() + 1:06d}"

            order = Order.objects.create(
                order_number=order_number,
                customer=request.user if request.user.is_authenticated else None,
                shipping_address_snapshot=shipping_address,
                billing_address_snapshot=billing_address,
                subtotal=subtotal,
                discount_total=discount_total,
                shipping_charge=shipping_charge,
                tax_total=tax_total,
                grand_total=grand_total,
                payment_method=payment_method,
                payment_status='paid' if payment_method == 'cod' else 'pending',
                fulfillment_status='pending',
                notes=notes,
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    variant=item.variant,
                    product_name=item.product.name,
                    sku=item.variant.sku if item.variant else item.product.sku,
                    unit_price=item.unit_price,
                    quantity=item.quantity,
                    total_price=item.total_price,
                )

                # Deduct stock
                if item.variant:
                    item.variant.stock_quantity -= item.quantity
                    item.variant.save()
                else:
                    item.product.stock_quantity -= item.quantity
                    item.product.save()

            OrderStatusHistory.objects.create(
                order=order,
                new_status='pending',
                changed_by=request.user if request.user.is_authenticated else None,
            )

            # Clear cart
            cart.items.all().delete()

            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _get_cart(self, request):
        if request.user.is_authenticated:
            from apps.cart.models import Cart
            return Cart.objects.filter(user=request.user).first()
        return None

    @action(detail=False, methods=['get'], url_path='(?P<order_number>[^/.]+)')
    def order_detail(self, request, order_number=None):
        try:
            order = Order.objects.get(order_number=order_number)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response(serializer.data)