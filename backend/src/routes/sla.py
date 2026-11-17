# backend/src/routes/sla.py
"""Routes for SLA tracking and SLA metrics in the Change Management backend."""


from datetime import datetime, timedelta
from flask import Blueprint, jsonify
from ..extensions import db
from ..models import Issue, SLAState, IssueStatus

sla_bp = Blueprint("sla", __name__, url_prefix="/api/sla")

@sla_bp.post("/scan")
def scan_sla():
    now = datetime.utcnow()
    issues = Issue.query.all()
    updated = 0
    for i in issues:
        if i.status in (IssueStatus.RESOLVED.value, IssueStatus.CLOSED.value):
            i.sla_state = SLAState.ON_TRACK.value
            continue
        if not i.due_at:
            i.due_at = now + timedelta(hours=72)
        if now > i.due_at:
            i.sla_state = SLAState.BREACHED.value
        elif (i.due_at - now).total_seconds() <= 12 * 3600:
            i.sla_state = SLAState.AT_RISK.value
        else:
            i.sla_state = SLAState.ON_TRACK.value
        updated += 1
    db.session.commit()
    return jsonify({"updated": updated, "ok": True})
