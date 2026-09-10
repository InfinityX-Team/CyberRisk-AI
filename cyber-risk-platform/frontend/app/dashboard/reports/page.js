"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";

export default function Reports() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/reports").then((r) => setLogs(r.data)).catch(() => {});
  }, []);

  const severityColor = {
    info: "bg-gray-100 text-gray-600",
    warning: "bg-yellow-50 text-yellow-600",
    critical: "bg-red-50 text-red-500",
  };

  const exportCSV = () => {
    const header = "Timestamp,Actor,Event,Severity\n";
    const rows = logs
      .map((l) => `${new Date(l.timestamp).toLocaleString()},${l.actor},${l.event},${l.severity}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-report.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-5">
        <div>
          <span className="text-xs font-semibold text-primary">AUDIT LOGS & GOVERNANCE REPORTS</span>
          <h1 className="text-2xl font-bold mt-1">Regulator-ready evidence</h1>
          <p className="text-sm text-gray-500">Immutable telemetry with exportable snapshots aligned to FAIR methodology.</p>
        </div>
        <button onClick={exportCSV} className="bg-primary text-white text-sm px-4 py-2 rounded-lg">⬇ Export CSV</button>
      </div>

      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b">
              <th className="py-2">Timestamp</th><th>Actor</th><th>Event</th><th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l._id} className="border-b last:border-0">
                <td className="py-2">{new Date(l.timestamp).toLocaleString()}</td>
                <td>{l.actor}</td>
                <td>{l.event}</td>
                <td><span className={`text-xs px-2 py-0.5 rounded-full ${severityColor[l.severity]}`}>{l.severity}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
