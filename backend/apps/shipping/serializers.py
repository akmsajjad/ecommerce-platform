from rest_framework import serializers
from .models import Shipment


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['id', 'order', 'courier_name', 'tracking_number', 'status', 'shipping_cost', 'cod_amount', 'response_data', 'created_at', 'updated_at']