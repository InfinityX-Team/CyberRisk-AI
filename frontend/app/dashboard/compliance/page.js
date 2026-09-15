"use client";

import { useEffect, useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from "recharts";
import api from "../../../lib/api";

const frameworks = ["NIST CSF 2.0", "ISO/IEC 27001:2022", "CIS Controls v8", "RBI Cyber Security Framework", "SEBI CSCRF"];

export default function Compliance() {
  const [active, setActive] = useState(frameworks[0]);
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/compliance/${encodeURIComponent(active)}`).then((r) => setData(r.data)).catch(() => setData(null));
  }, [active]);

  const barColor = (score) => (score >= 70 ? "text-green-600 bg-green-50" : score >= 60 ? "text-blue-600 bg-blue-50" : "text-yellow-600 bg-yellow-50");

  return (
    <div>
      <span className="text-xs font-semibold text-primary">FRAMEWORK COMPLIANCE MATRIX</span>
      <h1 className="text-2xl font-bold mt-1">Speak every regulator's language</h1>
      <p className="text-sm text-gray-500 mb-5">Live cross-walk mapping with control health per framework.</p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {frameworks.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-sm px-3 py-1.5 rounded-lg ${active === f ? "bg-primary text-white" : "bg-white border text-gray-600"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="card col-span-2">
          <div className="label-small mb-1">{active}</div>
          <div className="font-semibold mb-3">Domain health · Radar view</div>
          {data && (
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={data.domains}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <div className="label-small mb-1">Overall</div>
          <div className="text-3xl font-bold mb-1">{data?.overall}%</div>
          <div className="text-xs text-gray-400 mb-4">Average control health</div>
          {data?.domains.map((d) => (
            <div key={d.name} className={`rounded-lg px-3 py-2 mb-2 ${barColor(d.score)}`}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>{d.name}</span><span>{d.score}%</span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-1.5">
                <div className="bg-current h-1.5 rounded-full" style={{ width: `${d.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
