import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./SLA.css";

export default function SLA() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get("/issues").then((res) => setIssues(res.data || []));
  }, []);

  // Standard SLA hours
  const SLA_RULES = {
    LOW: 24,
    MEDIUM: 12,
    HIGH: 4,
    CRITICAL: 1,
  };

  // Calculate SLA progress percentage
  const calculateSLA = (issue) => {
    const created = new Date(issue.created_at);
    const now = new Date();

    const hoursPassed = (now - created) / (1000 * 60 * 60);
    const slaHours = SLA_RULES[issue.priority];

    let percent = (hoursPassed / slaHours) * 100;
    if (percent > 100) percent = 100;

    return { percent, hoursPassed, slaHours };
  };

  // Determine SLA color
  const getColorClass = (percent) => {
    if (percent < 60) return "sla-green";      // ON TRACK
    if (percent < 100) return "sla-orange";    // AT RISK
    return "sla-red";                          // BREACHED
  };

  return (
    <div className="sla-container">
      <h2 className="sla-title">⏳ SLA Monitoring</h2>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        issues.map((issue) => {
          const { percent, hoursPassed, slaHours } = calculateSLA(issue);
          const colorClass = getColorClass(percent);

          return (
            <div className="sla-card" key={issue.id}>
              <div className="sla-header">
                <h3>#{issue.id} — {issue.title}</h3>
                <span className={`priority-badge pri-${issue.priority.toLowerCase()}`}>
                  {issue.priority}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="progress-bg">
                <div
                  className={`progress-fill ${colorClass}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* SLA Info */}
              <div className="sla-info">
                <span>Elapsed: {hoursPassed.toFixed(1)} hrs</span>
                <span>Total SLA: {slaHours} hrs</span>
                <span>
                  Status:{" "}
                  {percent < 60
                    ? "🟢 ON TRACK"
                    : percent < 100
                    ? "🟠 AT RISK"
                    : "🔴 BREACHED"}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
