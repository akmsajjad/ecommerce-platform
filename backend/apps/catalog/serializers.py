from rest_framework import serializers
from .models import Category, Brand, Product, ProductVariant, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'image', 'is_active', 'children']

    def get_children(self, obj):
        return CategorySerializer(obj.children.all(), many=True).data


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'description']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_file', 'alt_text', 'is_primary', 'display_order']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'barcode', 'attributes', 'price_override', 'stock_quantity']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    effective_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'sku', 'barcode', 'short_description', 'description',
            'category', 'brand', 'regular_price', 'sale_price', 'cost_price',
            'stock_quantity', 'low_stock_threshold', 'status', 'is_featured', 'is_new',
            'weight', 'effective_price', 'images', 'variants', 'created_at', 'updated_at'
        ]

    def get_effective_price(self, obj):
        return obj.effective_price