import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function SLAChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/reports/sla")
       .then(res => setData(res.data))
       .catch(() => setData({}));
  }, []);

  return (
    <div className="report-card">
      <h3>SLA Report</h3>
      <ul className="chart-list">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="chart-item">
            <div className="label-row">
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: `${value * 12}px` }}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
