"""URL configuration for config project."""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/v1/', include('apps.accounts.urls')),
    path('api/v1/', include('apps.catalog.urls')),
    path('api/v1/', include('apps.cart.urls')),
    path('api/v1/', include('apps.checkout.urls')),
    path('api/v1/', include('apps.promotions.urls')),
    path('api/v1/', include('apps.affiliates.urls')),
    path('api/v1/', include('apps.inventory.urls')),
    path('api/v1/', include('apps.payments.urls')),
    path('api/v1/', include('apps.shipping.urls')),
    path('api/v1/admin/', include('apps.analytics.urls')),
    path('api/v1/admin/', include('apps.content.urls')),
    path('api/v1/admin/', include('apps.audit.urls')),
    path('api/v1/', include('apps.marketing.urls')),
    path('api/v1/', include('apps.reviews.urls')),
]