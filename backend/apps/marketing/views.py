from rest_framework import viewsets, permissions
from .models import NotificationLog, EmailCampaign, CustomerSegment
from .serializers import NotificationLogSerializer, EmailCampaignSerializer, CustomerSegmentSerializer


class NotificationLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NotificationLog.objects.all()
    serializer_class = NotificationLogSerializer
    permission_classes = [permissions.IsAuthenticated]


class EmailCampaignViewSet(viewsets.ModelViewSet):
    queryset = EmailCampaign.objects.all()
    serializer_class = EmailCampaignSerializer
    permission_classes = [permissions.IsAuthenticated]


class CustomerSegmentViewSet(viewsets.ModelViewSet):
    queryset = CustomerSegment.objects.all()
    serializer_class = CustomerSegmentSerializer
    permission_classes = [permissions.IsAuthenticated]