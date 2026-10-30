"""
Referral attribution middleware.
Stores affiliate referral code from ?ref=CODE parameter in a secure cookie for 30 days.
"""
import re
from django.utils.deprecation import MiddlewareMixin


class ReferralAttributionMiddleware(MiddlewareMixin):
    REFERRAL_COOKIE_NAME = 'bb_ref'
    COOKIE_MAX_AGE = 30 * 24 * 60 * 60  # 30 days

    REFERRAL_CODE_PATTERN = re.compile(r'^[A-Za-z0-9_-]{3,50}$')

    def process_request(self, request):
        ref_code = request.GET.get('ref')
        if ref_code and self.REFERRAL_CODE_PATTERN.match(ref_code):
            request.session['referral_code'] = ref_code
            request.session.set_expiry(self.COOKIE_MAX_AGE)

    def process_response(self, request, response):
        ref_code = request.session.get('referral_code')
        if ref_code and self.REFERRAL_CODE_PATTERN.match(ref_code):
            response.set_cookie(
                self.REFERRAL_COOKIE_NAME,
                ref_code,
                max_age=self.COOKIE_MAX_AGE,
                httponly=True,
                samesite='Lax',
            )
        return response