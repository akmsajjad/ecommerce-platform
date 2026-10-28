from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CouponViewSet, PromotionRuleViewSet

router = DefaultRouter()
router.register(r'coupons', CouponViewSet, basename='coupons')
router.register(r'promotions', PromotionRuleViewSet, basename='promotions')

urlpatterns = [
    path('', include(router.urls)),
]