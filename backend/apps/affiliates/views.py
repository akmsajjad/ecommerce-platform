from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AffiliateProfile, ReferralVisit, AffiliateCommission, PayoutRecord
from .serializers import AffiliateProfileSerializer, AffiliateRegisterSerializer, ReferralVisitSerializer, AffiliateCommissionSerializer, PayoutRecordSerializer


class AffiliateViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = AffiliateRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        referral_code = serializer.validated_data['referral_code']

        if AffiliateProfile.objects.filter(referral_code=referral_code).exists():
            return Response({'error': 'Referral code already exists'}, status=status.HTTP_400_BAD_REQUEST)

        affiliate = AffiliateProfile.objects.create(
            user=request.user if request.user.is_authenticated else None,
            referral_code=referral_code,
        )
        return Response(AffiliateProfileSerializer(affiliate).data, status=status.HTTP_201_CREATED)

    def list(self, request):
        if not request.user.is_authenticated:
            return Response([])
        try:
            profile = AffiliateProfile.objects.get(user=request.user)
            return Response(AffiliateProfileSerializer(profile).data)
        except AffiliateProfile.DoesNotExist:
            return Response({'error': 'Not an affiliate'}, status=status.HTTP_404_NOT_FOUND)


class AffiliateDashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        try:
            profile = AffiliateProfile.objects.get(user=request.user)
        except AffiliateProfile.DoesNotExist:
            return Response({'error': 'Not an affiliate'}, status=status.HTTP_404_NOT_FOUND)

        commissions = AffiliateCommission.objects.filter(affiliate=profile)
        total_earned = sum(c.commission_amount for c in commissions if c.status == 'paid')
        total_pending = sum(c.commission_amount for c in commissions if c.status == 'pending')

        return Response({
            'referral_code': profile.referral_code,
            'status': profile.status,
            'commission_rate': profile.commission_rate,
            'total_earned': total_earned,
            'total_pending': total_pending,
            'commissions': AffiliateCommissionSerializer(commissions, many=True).data,
        })


class ReferralVisitViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        referral_code = request.data.get('referral_code')
        try:
            affiliate = AffiliateProfile.objects.get(referral_code=referral_code)
        except AffiliateProfile.DoesNotExist:
            return Response({'error': 'Invalid referral code'}, status=status.HTTP_400_BAD_REQUEST)

        visit = ReferralVisit.objects.create(
            affiliate=affiliate,
            visitor_ip=request.data.get('visitor_ip', ''),
            landing_page=request.data.get('landing_page', ''),
        )
        return Response(ReferralVisitSerializer(visit).data, status=status.HTTP_201_CREATED)