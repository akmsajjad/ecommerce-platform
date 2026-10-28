from rest_framework import viewsets, permissions
from .models import Shipment
from .serializers import ShipmentSerializer


class ShipmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    permission_classes = [permissions.IsAuthenticated]