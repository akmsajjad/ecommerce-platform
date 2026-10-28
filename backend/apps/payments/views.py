from rest_framework import viewsets, permissions
from .models import PaymentTransaction
from .serializers import PaymentTransactionSerializer


class PaymentTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentTransaction.objects.all()
    serializer_class = PaymentTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]