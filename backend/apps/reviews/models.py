from django.db import models
from django.conf import settings


class ProductReview(models.Model):
    RATING_CHOICES = [(i, i) for i in range(1, 6)]
    MODERATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    product = models.ForeignKey('catalog.Product', on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=RATING_CHOICES)
    title = models.CharField(max_length=200, blank=True)
    comment = models.TextField()
    is_verified_purchase = models.BooleanField(default=False)
    moderation_status = models.CharField(max_length=20, choices=MODERATION_STATUS_CHOICES, default='pending')
    helpful_votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'reviews_productreview'
        ordering = ['-created_at']
        unique_together = ['product', 'customer']

    def __str__(self):
        return f'{self.product.name} - {self.rating}★'