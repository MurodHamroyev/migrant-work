from .i18n import tr
from .models import Application, Notification

# Документы для финального оформления: ключ -> список (kind). Меняйте здесь.
LEGAL = {
    "patent": ["selfie", "passport", "migration_card", "registration", "patent", "green_card", "dms",
               "patent_receipts", "inn", "snils", "language_cert"],
    "vnzh": ["selfie", "passport", "migration_card", "registration_vnzh", "inn", "snils"],
    "rf": ["selfie", "passport", "inn", "snils"],
    "eac": ["selfie", "passport", "migration_card", "registration", "inn", "snils"],
}
OPTIONAL = {("vnzh", "migration_card")}
MULTI = {"patent_receipts"}


def notify(user, key, **kw):
    Notification.objects.create(user=user, text=tr(user.lang, key, **kw))


def notify_admins(text, url=""):
    Notification.objects.create(for_admin=True, text=text, url=url)


def can_view(viewer, target):
    if viewer.id == target.id or viewer.role in ("admin", "operator"):
        return True
    if viewer.role == "manager" and viewer.warehouse_id:
        return Application.objects.filter(user=target, vacancy__warehouse_id=viewer.warehouse_id).exists()
    return False


def name_match(text, q):
    text = text.lower()
    return all(w in text for w in q.lower().split())
