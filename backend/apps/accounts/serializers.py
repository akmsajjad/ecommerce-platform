from rest_framework import serializers
from .models import User, CustomerProfile, Address


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'phone', 'role', 'is_verified', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ['id', 'loyalty_points', 'marketing_consent', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'recipient_name', 'phone', 'division', 'district', 'upazila', 'address_line', 'is_default', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']