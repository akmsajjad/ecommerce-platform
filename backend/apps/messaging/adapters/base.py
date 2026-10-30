from abc import ABC, abstractmethod
from typing import Optional


class BaseNotificationAdapter(ABC):
    """Abstract base class for notification channel adapters."""

    @abstractmethod
    def send(self, recipient: str, subject: str, message: str) -> dict:
        """Send a notification. Returns a result dict with status and details."""
        pass


class EmailAdapter(BaseNotificationAdapter):
    """Email notification adapter (console/smtp mock for development)."""

    def send(self, recipient: str, subject: str, message: str) -> dict:
        # Mock email sending - in production integrate with SMTP/SES/etc.
        print(f"[EMAIL] To: {recipient} | Subject: {subject} | Message: {message[:100]}...")
        return {
            'status': 'sent',
            'channel': 'email',
            'recipient': recipient,
            'message_id': f'email-{abs(hash((recipient, subject))) % 1000000}',
        }


class SMSAdapter(BaseNotificationAdapter):
    """SMS notification adapter (mock for development)."""

    def send(self, recipient: str, subject: str, message: str) -> dict:
        # Mock SMS sending - in production integrate with Twilio/Meta/etc.
        print(f"[SMS] To: {recipient} | Message: {message[:160]}...")
        return {
            'status': 'sent',
            'channel': 'sms',
            'recipient': recipient,
            'message_id': f'sms-{abs(hash(recipient)) % 1000000}',
        }


class InAppAdapter(BaseNotificationAdapter):
    """In-app notification adapter (stores in database)."""

    def send(self, recipient: str, subject: str, message: str) -> dict:
        # In-app notifications are stored as NotificationLog records
        return {
            'status': 'sent',
            'channel': 'in_app',
            'recipient': recipient,
            'message_id': f'inapp-{abs(hash((recipient, subject))) % 1000000}',
        }


# Adapter registry
NOTIFICATION_ADAPTERS = {
    'email': EmailAdapter(),
    'sms': SMSAdapter(),
    'in_app': InAppAdapter(),
}


def get_adapter(channel: str) -> Optional[BaseNotificationAdapter]:
    """Get notification adapter for the given channel."""
    return NOTIFICATION_ADAPTERS.get(channel)