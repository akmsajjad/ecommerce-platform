from rest_framework import serializers
from .models import PaymentTransaction


class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = ['id', 'order', 'gateway_name', 'transaction_id', 'amount', 'currency', 'status', 'raw_response', 'created_at', 'updated_at']