from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AffiliateViewSet, AffiliateDashboardViewSet, ReferralVisitViewSet

router = DefaultRouter()
router.register(r'affiliates', AffiliateViewSet, basename='affiliates')
router.register(r'affiliate-dashboard', AffiliateDashboardViewSet, basename='affiliate-dashboard')
router.register(r'referral-visits', ReferralVisitViewSet, basename='referral-visits')

urlpatterns = [
    path('', include(router.urls)),
]