"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../../../lib/api";

export default function Simulator() {
  const [mfa, setMfa] = useState(false);
  const [zeroTrust, setZeroTrust] = useState(false);
  const [patchSla, setPatchSla] = useState(30);
  const [edrCoverage, setEdrCoverage] = useState(60);
  const [backupFrequency, setBackupFrequency] = useState(24);
  const [result, setResult] = useState(null);

  const run = async () => {
    const res = await api.post("/simulator/run", { mfa, zeroTrust, patchSla, edrCoverage, backupFrequency });
    setResult(res.data);
  };

  const chartData = result
    ? [
        { name: "Baseline", value: result.baseline },
        { name: "Scenario", value: result.scenario },
      ]
    : [];

  return (
    <div>
      <span className="text-xs font-semibold text-primary">MONTE CARLO SCENARIO SIMULATOR</span>
      <h1 className="text-2xl font-bold mt-1">Ask "what if" — see it in dollars</h1>
      <p className="text-sm text-gray-500 mb-5">Toggle controls and see live impact on Expected Annual Loss and VaR.</p>

      <div className="grid grid-cols-2 gap-5">
        <div className="card">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <div className="text-sm font-medium">Mandatory MFA rollout</div>
              <div className="text-xs text-gray-400">All privileged accounts</div>
            </div>
            <input type="checkbox" checked={mfa} onChange={(e) => setMfa(e.target.checked)} className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <div className="text-sm font-medium">Zero-Trust segmentation</div>
              <div className="text-xs text-gray-400">Micro-perimeter enforcement</div>
            </div>
            <input type="checkbox" checked={zeroTrust} onChange={(e) => setZeroTrust(e.target.checked)} className="w-5 h-5" />
          </div>

          <div className="py-3 border-b">
            <div className="flex justify-between text-sm mb-1">
              <span>Patch SLA</span><span>{patchSla} days</span>
            </div>
            <input type="range" min="1" max="60" value={patchSla} onChange={(e) => setPatchSla(Number(e.target.value))} className="w-full" />
          </div>

          <div className="py-3 border-b">
            <div className="flex justify-between text-sm mb-1">
              <span>EDR coverage</span><span>{edrCoverage}%</span>
            </div>
            <input type="range" min="0" max="100" value={edrCoverage} onChange={(e) => setEdrCoverage(Number(e.target.value))} className="w-full" />
          </div>

          <div className="py-3 mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Backup frequency</span><span>every {backupFrequency}h</span>
            </div>
            <input type="range" min="1" max="48" value={backupFrequency} onChange={(e) => setBackupFrequency(Number(e.target.value))} className="w-full" />
          </div>

          <button onClick={run} className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-medium">
            ⟳ Run simulation
          </button>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-1">
            <div className="label-small">Simulation Result</div>
            {result && <span className="text-xs text-green-600">↘ ${(result.lossAvoided / 1000).toFixed(1)}K loss avoided</span>}
          </div>
          <div className="font-semibold mb-3">Financial exposure delta</div>
          {result ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => `$${(v / 1000000).toFixed(2)}M`} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    <Cell fill="#ef4444" />
                    <Cell fill="#1a73e8" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="border rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">{result.riskScoreBefore} → {result.riskScoreAfter}</div>
                  <div className="text-[10px] text-gray-500">RISK SCORE</div>
                </div>
                <div className="border rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">${result.varBefore}M → ${result.varAfter}M</div>
                  <div className="text-[10px] text-gray-500">VAR 95%</div>
                </div>
                <div className="border rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">{result.controlsBefore}% → {result.controlsAfter}%</div>
                  <div className="text-[10px] text-gray-500">CONTROLS</div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">Adjust the controls and run a simulation to see results.</p>
          )}
        </div>
      </div>
    </div>
  );
}
