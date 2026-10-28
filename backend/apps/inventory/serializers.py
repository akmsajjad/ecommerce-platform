from rest_framework import serializers
from .models import StockMovement


class StockMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMovement
        fields = ['id', 'product', 'variant', 'change_type', 'quantity_change', 'reference_id', 'notes', 'created_by', 'created_at']