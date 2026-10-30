from rest_framework import serializers
from .models import AffiliateProfile, ReferralVisit, AffiliateCommission, PayoutRecord


class AffiliateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffiliateProfile
        fields = ['id', 'user', 'referral_code', 'commission_rate', 'status', 'payout_details', 'created_at', 'updated_at']


class AffiliateRegisterSerializer(serializers.Serializer):
    referral_code = serializers.CharField(max_length=50)


class ReferralVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralVisit
        fields = ['id', 'affiliate', 'visitor_ip', 'landing_page', 'converted_order', 'created_at']


class AffiliateCommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffiliateCommission
        fields = ['id', 'affiliate', 'order', 'base_amount', 'commission_rate', 'commission_amount', 'status', 'created_at', 'updated_at']


class PayoutRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayoutRecord
        fields = ['id', 'affiliate', 'amount', 'payment_method', 'transaction_reference', 'status', 'created_at', 'updated_at']