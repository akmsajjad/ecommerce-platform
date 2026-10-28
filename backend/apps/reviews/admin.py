from django.contrib import admin
from .models import ProductReview


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'customer', 'rating', 'moderation_status', 'is_verified_purchase', 'created_at']
    list_filter = ['rating', 'moderation_status', 'is_verified_purchase', 'created_at']
    search_fields = ['product__name', 'customer__email', 'title']