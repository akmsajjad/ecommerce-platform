from django.db import models
from django.conf import settings
from apps.catalog.models import Product, ProductVariant


class StockMovement(models.Model):
    CHOICE_TYPES = [
        ('in', 'Stock In'),
        ('out', 'Stock Out'),
        ('adjustment', 'Adjustment'),
        ('reservation', 'Reservation'),
        ('release', 'Release'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_movements')
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True, related_name='stock_movements')
    change_type = models.CharField(max_length=20, choices=CHOICE_TYPES)
    quantity_change = models.IntegerField()
    reference_id = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'inventory_stockmovement'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.change_type} - {self.quantity_change}'