import React from "react";
import PriorityChart from "../components/PriorityChart";
import StatusChart from "../components/StatusChart";
import SLAChart from "../components/SLAChart";
import ReportGenerator from "../components/ReportGenerator";
import "./Reports.css";

export default function Reports() {
  return (
    <div className="reports-container">
      <h2 className="page-title">📊 Reports Dashboard</h2>

      <div className="reports-grid">
        <PriorityChart />
        <StatusChart />
        <SLAChart />
      </div>

      <ReportGenerator />
    </div>
  );
}

import React from "react";
import PriorityChart from "../components/PriorityChart";
import StatusChart from "../components/StatusChart";
import SLAChart from "../components/SLAChart";
import ReportGenerator from "../components/ReportGenerator";
import "./Reports.css";

export default function Reports() {
  return (
    <div className="reports-container">
      <h2 className="page-title">📊 Reports Dashboard</h2>

      <div className="reports-grid">
        <PriorityChart />
        <StatusChart />
        <SLAChart />
      </div>

      <ReportGenerator />
    </div>
  );
}
