from rest_framework import serializers
from .models import ProductReview


class ProductReviewSerializer(serializers.ModelSerializer):
    customer_email = serializers.ReadOnlyField(source='customer.email')

    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'customer', 'customer_email', 'rating', 'title', 'comment', 'is_verified_purchase', 'moderation_status', 'helpful_votes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'customer', 'is_verified_purchase', 'moderation_status', 'helpful_votes', 'created_at', 'updated_at']