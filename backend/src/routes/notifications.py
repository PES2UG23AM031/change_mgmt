from flask import Blueprint, request, jsonify
from ..models import Notification
from ..extensions import db

notifications_bp = Blueprint("notifications", __name__, url_prefix="/api/notifications")

@notifications_bp.get("")
def list_notifications():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return {"error": "user_id required"}, 400
    rows = (Notification.query.filter_by(user_id=user_id)
            .order_by(Notification.created_at.desc()).limit(50).all())
    return jsonify([serialize(n) for n in rows])

@notifications_bp.post("/mark-read")
def mark_read():
    data = request.get_json(force=True)
    notif_id = data.get("notification_id")
    user_id = data.get("user_id")
    if not notif_id or not user_id:
        return {"error": "notification_id and user_id required"}, 400
    n = Notification.query.get_or_404(notif_id)
    if n.user_id != user_id:
        return {"error": "forbidden"}, 403
    n.is_read = True
    db.session.commit()
    return {"ok": True}

def serialize(n):
    return {
        "id": n.id, "title": n.title, "message": n.message,
        "link": n.link, "is_read": n.is_read,
        "created_at": n.created_at.isoformat()
    }
