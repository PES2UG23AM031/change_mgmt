import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./DashboardCards.css";

export default function DashboardCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard/overview")
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) return <p>Loading overview...</p>;

  return (
    <div className="card-container">

      {/* TOTAL ISSUES */}
      <div className="stat-card blue">
        <div className="icon">📊</div>
        <h3>Total Issues</h3>
        <p className="count">{data.total_issues}</p>
      </div>

      {/* ASSIGNED */}
      <div className="stat-card green">
        <div className="icon">🧑‍💻</div>
        <h3>Assigned</h3>
        <p className="count">{data.assigned}</p>
      </div>

      {/* UNASSIGNED */}
      <div className="stat-card red">
        <div className="icon">❗</div>
        <h3>Unassigned</h3>
        <p className="count">{data.unassigned}</p>
      </div>

      {/* SLA BREACHED */}
      <div className="stat-card orange">
        <div className="icon">⏳</div>
        <h3>SLA Breached</h3>
        <p className="count">{data.sla_breakdown?.BREACHED || 0}</p>
      </div>

import { useEffect, useState } from "react";
import { getIssues } from "../api/api";

export default function DashboardCards() {
  const [counts, setCounts] = useState({ OPEN: 0, IN_PROGRESS: 0, DONE: 0 });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getIssues();
        const c = { OPEN: 0, IN_PROGRESS: 0, DONE: 0 };
        (data || []).forEach((it) => {
          const s = (it.status || "OPEN").toUpperCase();
          if (c[s] !== undefined) c[s] += 1;
        });
        setCounts(c);
      } catch (e) {
        console.error(e);
        setErr("Failed to load issues.");
      }
    })();
  }, []);

  return (
    <div>
      {err ? <p style={{ color: "crimson" }}>{err}</p> : null}
      <div className="grid">
        <Stat title="Open" value={counts.OPEN} />
        <Stat title="In-Progress" value={counts.IN_PROGRESS} />
        <Stat title="Done" value={counts.DONE} />
      </div>
      <style>{`
        .grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
      `}</style>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat">
      <div className="label">{title}</div>
      <div className="value">{value}</div>
      <style>{`
        .stat { background:#fff; padding:18px; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); text-align:center; }
        .label { font-size:14px; opacity:.8; margin-bottom:6px; }
        .value { font-size:28px; font-weight:800; }
      `}</style>
    </div>
  );
}
