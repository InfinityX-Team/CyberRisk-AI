"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import api from "../../lib/api";
import StatCard from "../../components/StatCard";

export default function ExecutiveDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data)).catch(() => {});
  }, []);

  if (!data) return <p className="text-gray-500">Loading dashboard...</p>;

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-semibold text-primary">EXECUTIVE DASHBOARD</span>
          <h1 className="text-2xl font-bold mt-1">Enterprise Cyber Risk · Live</h1>
          <p className="text-sm text-gray-500">Real-time financial exposure, top drivers and trend analysis for board-level decision-making.</p>
        </div>
        <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">● Streaming telemetry</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Risk Score" value={`${data.riskScore}/100`} sub="Composite index · Stable" subColor="text-green-600" />
        <StatCard label="Expected Annual Loss" value={`$${(data.expectedAnnualLoss / 1000000).toFixed(2)}M`} sub="ALE · Enterprise · Live" subColor="text-green-600" />
        <StatCard label="Value-at-Risk 95%" value={`$${(data.valueAtRisk / 1000000).toFixed(2)}M`} sub="99%: $11.89M" />
        <StatCard label="Control Effectiveness" value={`${data.controlEffectiveness}%`} sub="8 open · 8 critical" />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="card col-span-2">
          <div className="label-small mb-1">Trend · 12 months</div>
          <div className="font-semibold mb-3">Financial exposure over time</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.trend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip formatter={(v) => `$${v}M`} />
              <Area type="monotone" dataKey="ale" stroke="#1a73e8" fill="#d6e8fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="label-small mb-1">By Business Unit</div>
          <div className="font-semibold mb-3">ALE breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.byBusinessUnit} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip formatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Bar dataKey="ale" fill="#1a73e8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="label-small mb-1">Top 5 Monetary Risk Contributors</div>
        <div className="font-semibold mb-3">Drill into assets driving the most loss</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b">
              <th className="py-2">Asset</th>
              <th>Business Unit</th>
              <th>Criticality</th>
              <th>LEF</th>
              <th>Annual Loss</th>
            </tr>
          </thead>
          <tbody>
            {data.topContributors.map((a) => (
              <tr key={a._id} className="border-b last:border-0">
                <td className="py-2">{a.name}</td>
                <td>{a.businessUnit}</td>
                <td>
                  <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{a.criticality}</span>
                </td>
                <td>{a.lef}</td>
                <td className="text-primary font-semibold">${(a.ale / 1000).toFixed(1)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
