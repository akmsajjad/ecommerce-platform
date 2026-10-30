from rest_framework import viewsets, permissions
from .models import HomepageBanner, StoreSetting
from .serializers import HomepageBannerSerializer, StoreSettingSerializer


class HomepageBannerViewSet(viewsets.ModelViewSet):
    queryset = HomepageBanner.objects.filter(is_active=True)
    serializer_class = HomepageBannerSerializer
    permission_classes = [permissions.IsAuthenticated]


class StoreSettingViewSet(viewsets.ModelViewSet):
    queryset = StoreSetting.objects.all()
    serializer_class = StoreSettingSerializer
    permission_classes = [permissions.IsAuthenticated]