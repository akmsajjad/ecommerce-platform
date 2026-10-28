from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomepageBannerViewSet, StoreSettingViewSet

router = DefaultRouter()
router.register(r'banners', HomepageBannerViewSet, basename='banners')
router.register(r'settings', StoreSettingViewSet, basename='settings')

urlpatterns = [
    path('', include(router.urls)),
]