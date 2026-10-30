from django.contrib import admin
from .models import PaymentTransaction


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'order', 'gateway_name', 'amount', 'status', 'created_at']
    list_filter = ['gateway_name', 'status', 'created_at']
    search_fields = ['transaction_id', 'order__order_number']