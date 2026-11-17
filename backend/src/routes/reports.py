# backend/src/routes/reports.py
"""Routes for analytics and CSV export in the Change Management backend."""


from flask import Blueprint, jsonify, Response
from io import StringIO
import csv

from flask import Blueprint, jsonify, make_response, request
# then your local imports
from .something import something_else


reports_bp = Blueprint("reports", __name__, url_prefix="/api/reports")


# ----------------------------------------------------
# 1) PRIORITY REPORT
# ----------------------------------------------------
@reports_bp.get("/priority")
def report_priority():
    issues = Issue.query.all()
    result = {}

    for i in issues:
        p = (i.priority or "MEDIUM").upper()
        result[p] = result.get(p, 0) + 1

    return jsonify(result)


# ----------------------------------------------------
# 2) STATUS REPORT
# ----------------------------------------------------
@reports_bp.get("/status")
def report_status():
    issues = Issue.query.all()
    result = {}

    for i in issues:
        s = (i.status or "OPEN").upper()
        result[s] = result.get(s, 0) + 1

    return jsonify(result)


# ----------------------------------------------------
# 3) SLA REPORT
# ----------------------------------------------------
@reports_bp.get("/sla")
def report_sla():
    issues = Issue.query.all()
    result = {
        "ON_TRACK": 0,
        "AT_RISK": 0,
        "BREACHED": 0,
    }

    for i in issues:
        state = (i.sla_state or "ON_TRACK").upper()
        if state in result:
            result[state] += 1

    return jsonify(result)


# ----------------------------------------------------
# 4) CSV EXPORT (FIXED – WORKS WITH AXIOS BLOB)
# ----------------------------------------------------
@reports_bp.get("/export")
def export_report():
    issues = Issue.query.all()

    # String CSV writer
    output = StringIO()
    writer = csv.writer(output)

    # Header row
    writer.writerow(["ID", "Title", "Status", "Reporter ID", "Assignee ID"])

    # Data rows
    for i in issues:
        writer.writerow([
            i.id,
            i.title,
            i.status,
            i.reporter_id,
            i.assignee_id
        ])

    csv_data = output.getvalue()

    # Correct Response for Axios blob downloads
    return Response(
        csv_data,
        mimetype="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=cms_report.csv"
        }
    )
from flask import Blueprint, jsonify, Response
from io import StringIO
import csv
from ..models import Issue

reports_bp = Blueprint("reports", __name__, url_prefix="/api/reports")


# ----------------------------------------------------
# 1) PRIORITY REPORT
# ----------------------------------------------------
@reports_bp.get("/priority")
def report_priority():
    issues = Issue.query.all()
    result = {}

    for i in issues:
        p = (i.priority or "MEDIUM").upper()
        result[p] = result.get(p, 0) + 1

    return jsonify(result)


# ----------------------------------------------------
# 2) STATUS REPORT
# ----------------------------------------------------
@reports_bp.get("/status")
def report_status():
    issues = Issue.query.all()
    result = {}

    for i in issues:
        s = (i.status or "OPEN").upper()
        result[s] = result.get(s, 0) + 1

    return jsonify(result)


# ----------------------------------------------------
# 3) SLA REPORT
# ----------------------------------------------------
@reports_bp.get("/sla")
def report_sla():
    issues = Issue.query.all()
    result = {
        "ON_TRACK": 0,
        "AT_RISK": 0,
        "BREACHED": 0,
    }

    for i in issues:
        state = (i.sla_state or "ON_TRACK").upper()
        if state in result:
            result[state] += 1

    return jsonify(result)


# ----------------------------------------------------
# 4) CSV EXPORT (FIXED – WORKS WITH AXIOS BLOB)
# ----------------------------------------------------
@reports_bp.get("/export")
def export_report():
    issues = Issue.query.all()

    # String CSV writer
    output = StringIO()
    writer = csv.writer(output)

    # Header row
    writer.writerow(["ID", "Title", "Status", "Reporter ID", "Assignee ID"])

    # Data rows
    for i in issues:
        writer.writerow([
            i.id,
            i.title,
            i.status,
            i.reporter_id,
            i.assignee_id
        ])

    csv_data = output.getvalue()

    # Correct Response for Axios blob downloads
    return Response(
        csv_data,
        mimetype="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=cms_report.csv"
        }
    )
