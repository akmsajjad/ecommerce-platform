from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DashboardMetric, SalesSummary
from .serializers import DashboardMetricSerializer, SalesSummarySerializer


class AnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        return Response({
            'message': 'Analytics endpoint',
        })

    @action(detail=False, methods=['get'])
    def summary(self, request):
        total_revenue = 0
        total_orders = 0
        try:
            from apps.checkout.models import Order
            orders = Order.objects.all()
            total_orders = orders.count()
            total_revenue = sum(float(o.grand_total) for o in orders)
        except Exception:
            pass

        return Response({
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'total_customers': 0,
        })


class DashboardMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DashboardMetric.objects.all()
    serializer_class = DashboardMetricSerializer
    permission_classes = [permissions.IsAuthenticated]


class SalesSummaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SalesSummary.objects.all()
    serializer_class = SalesSummarySerializer
    permission_classes = [permissions.IsAuthenticated]