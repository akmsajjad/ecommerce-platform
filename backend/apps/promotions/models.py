from django.db import models
from django.conf import settings
from django.utils import timezone


class Coupon(models.Model):
    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPE_CHOICES)
    discount_value = models.DecimalField(max_digits=12, decimal_places=2)
    min_order_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    usage_limit = models.IntegerField(null=True, blank=True)
    times_used = models.IntegerField(default=0)
    start_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'promotions_coupon'

    def __str__(self):
        return self.code

    def is_valid(self):
        now = timezone.now()
        return (
            self.is_active
            and self.start_date <= now
            and self.expiry_date >= now
            and (self.usage_limit is None or self.times_used < self.usage_limit)
        )


class PromotionRule(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    discount_type = models.CharField(max_length=20, choices=[('percentage', 'Percentage'), ('fixed', 'Fixed Amount')])
    discount_value = models.DecimalField(max_digits=12, decimal_places=2)
    min_spend = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    min_quantity = models.IntegerField(default=1)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=0)

    class Meta:
        db_table = 'promotions_promotionrule'
        ordering = ['-priority']

    def __str__(self):
        return self.name

    def is_valid(self):
        now = timezone.now()
        return self.is_active and self.start_date <= now and self.end_date >= now