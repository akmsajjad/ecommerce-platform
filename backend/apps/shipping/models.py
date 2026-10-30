from django.db import models
from django.conf import settings


class Shipment(models.Model):
    COURIER_CHOICES = [
        ('pathao', 'Pathao'),
        ('steadfast', 'Steadfast'),
        ('redx', 'RedX'),
        ('mock', 'Mock Courier'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('picked_up', 'Picked Up'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered'),
        ('returned', 'Returned'),
        ('cancelled', 'Cancelled'),
    ]

    order = models.ForeignKey('checkout.Order', on_delete=models.CASCADE, related_name='shipments')
    courier_name = models.CharField(max_length=20, choices=COURIER_CHOICES)
    tracking_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    shipping_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    cod_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    response_data = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'shipping_shipment'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.tracking_number} - {self.status}'