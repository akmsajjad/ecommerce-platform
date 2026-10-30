from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnalyticsViewSet, DashboardMetricViewSet, SalesSummaryViewSet

router = DefaultRouter()
router.register(r'summary', AnalyticsViewSet, basename='analytics-summary')
router.register(r'metrics', DashboardMetricViewSet, basename='metrics')
router.register(r'sales', SalesSummaryViewSet, basename='sales')

urlpatterns = [
    path('', include(router.urls)),
]