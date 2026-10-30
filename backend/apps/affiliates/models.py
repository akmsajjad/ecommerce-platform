from django.db import models
from django.conf import settings


class AffiliateProfile(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('suspended', 'Suspended'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='affiliate_profile')
    referral_code = models.CharField(max_length=50, unique=True)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payout_details = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'affiliates_affiliateprofile'

    def __str__(self):
        return self.referral_code


class ReferralVisit(models.Model):
    affiliate = models.ForeignKey(AffiliateProfile, on_delete=models.CASCADE, related_name='visits')
    visitor_ip = models.CharField(max_length=45, blank=True)
    landing_page = models.CharField(max_length=500, blank=True)
    converted_order = models.ForeignKey('checkout.Order', on_delete=models.SET_NULL, null=True, blank=True, related_name='referred_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'affiliates_referralvisit'

    def __str__(self):
        return f'{self.affiliate.referral_code} - {self.created_at}'


class AffiliateCommission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('paid', 'Paid'),
        ('reversed', 'Reversed'),
    ]

    affiliate = models.ForeignKey(AffiliateProfile, on_delete=models.CASCADE, related_name='commissions')
    order = models.ForeignKey('checkout.Order', on_delete=models.CASCADE, related_name='commissions')
    base_amount = models.DecimalField(max_digits=12, decimal_places=2)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2)
    commission_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'affiliates_affiliatecommission'

    def __str__(self):
        return f'{self.affiliate.referral_code} - {self.commission_amount}'


class PayoutRecord(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ]

    affiliate = models.ForeignKey(AffiliateProfile, on_delete=models.CASCADE, related_name='payouts')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    transaction_reference = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'affiliates_payoutrecord'

    def __str__(self):
        return f'{self.affiliate.referral_code} - {self.amount}'