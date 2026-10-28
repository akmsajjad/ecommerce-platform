from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationLogViewSet, EmailCampaignViewSet, CustomerSegmentViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationLogViewSet, basename='notifications')
router.register(r'campaigns', EmailCampaignViewSet, basename='campaigns')
router.register(r'segments', CustomerSegmentViewSet, basename='segments')

urlpatterns = [
    path('', include(router.urls)),
]