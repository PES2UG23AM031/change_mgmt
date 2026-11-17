import React, { useState } from "react";
import api from "../api/api";
import "./ReportGenerator.css";

export default function ReportGenerator() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");  // success | error

  async function downloadCSV() {
    try {
      const res = await api.get("/reports/export", { responseType: "blob" });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "cms_report.csv";
      a.click();

      setMsg("Report downloaded successfully.");
      setMsgType("success");
    } catch (err) {
      setMsg("Failed to download report.");
      setMsgType("error");
    }
  }

  return (
    <div className="export-card">
      <h3 className="export-title">📥 Export Reports</h3>

      <p className="export-desc">
        Download all issue data, status, priority, SLA history and audit summary as a CSV file.
      </p>

      <button className="export-btn" onClick={downloadCSV}>
        ⬇ Download CSV
      </button>

      {msg && (
        <p className={`export-msg ${msgType}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
import React, { useState } from "react";
import api from "../api/api";
import "./ReportGenerator.css";

export default function ReportGenerator() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");  // success | error

  async function downloadCSV() {
    try {
      const res = await api.get("/reports/export", { responseType: "blob" });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "cms_report.csv";
      a.click();

      setMsg("Report downloaded successfully.");
      setMsgType("success");
    } catch (err) {
      setMsg("Failed to download report.");
      setMsgType("error");
    }
  }

  return (
    <div className="export-card">
      <h3 className="export-title">📥 Export Reports</h3>

      <p className="export-desc">
        Download all issue data, status, priority, SLA history and audit summary as a CSV file.
      </p>

      <button className="export-btn" onClick={downloadCSV}>
        ⬇ Download CSV
      </button>

      {msg && (
        <p className={`export-msg ${msgType}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
