"use client";

import { useEffect, useState } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, ZAxis,
} from "recharts";
import api from "../../../lib/api";

const tabs = ["Asset criticality matrix", "Vulnerabilities · CVE/EPSS", "Risk heatmap"];

export default function RiskQuantification() {
  const [tab, setTab] = useState(tabs[0]);
  const [assets, setAssets] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    api.get("/risk/assets").then((r) => setAssets(r.data)).catch(() => {});
    api.get("/risk/vulnerabilities").then((r) => setVulns(r.data)).catch(() => {});
    api.get("/risk/heatmap").then((r) => setHeatmap(r.data)).catch(() => {});
  }, []);

  const statusColor = { open: "bg-red-50 text-red-500", "in-progress": "bg-yellow-50 text-yellow-600", closed: "bg-green-50 text-green-600" };

  return (
    <div>
      <span className="text-xs font-semibold text-primary">RISK QUANTIFICATION ENGINE</span>
      <h1 className="text-2xl font-bold mt-1">Continuous monetary risk model</h1>
      <p className="text-sm text-gray-500 mb-5">FAIR-aligned: Loss Event Frequency × Single Loss Expectancy = Annualized Loss per asset.</p>

      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-3 py-1.5 rounded-lg ${tab === t ? "bg-primary text-white" : "bg-white border text-gray-600"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card">
        {tab === "Asset criticality matrix" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b">
                <th className="py-2">Asset</th><th>Business Unit</th><th>Criticality</th>
                <th>Value</th><th>Vuln Pressure</th><th>LEF</th><th>SLE</th><th>ALE</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a._id} className="border-b last:border-0">
                  <td className="py-2">{a.name}</td>
                  <td>{a.businessUnit}</td>
                  <td><span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{a.criticality}</span></td>
                  <td>${(a.value / 1000000).toFixed(2)}M</td>
                  <td>{a.vulnPressure}</td>
                  <td>{a.lef}</td>
                  <td>${(a.sle / 1000).toFixed(0)}K</td>
                  <td className="text-primary font-semibold">${(a.ale / 1000).toFixed(1)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Vulnerabilities · CVE/EPSS" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b">
                <th className="py-2">CVE</th><th>Title</th><th>Impacted Asset</th>
                <th>CVSS</th><th>EPSS</th><th>Age (d)</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vulns.map((v) => (
                <tr key={v._id} className="border-b last:border-0">
                  <td className="py-2 font-mono text-xs">{v.cve}</td>
                  <td>{v.title}</td>
                  <td>{v.impactedAsset}</td>
                  <td className={v.cvss >= 9 ? "text-red-500 font-semibold" : ""}>{v.cvss}</td>
                  <td>{v.epss}%</td>
                  <td>{v.ageDays}</td>
                  <td><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[v.status]}`}>{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Risk heatmap" && (
          <div>
            <div className="label-small mb-1">Likelihood × Impact</div>
            <div className="font-semibold mb-3">Risk heatmap (bubble = ALE)</div>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart margin={{ left: 10, bottom: 10 }}>
                <XAxis type="number" dataKey="lef" name="Loss Event Frequency" tick={{ fontSize: 11 }} />
                <YAxis type="number" dataKey="ale" name="ALE" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
                <ZAxis type="number" dataKey="ale" range={[80, 500]} />
                <Tooltip formatter={(v, n) => (n === "ale" ? `$${(v / 1000).toFixed(0)}K` : v)} />
                <Scatter data={heatmap} fill="#1a73e8" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
