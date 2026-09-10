"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../../lib/api";

export default function Investment() {
  const [budget, setBudget] = useState(100000);
  const [result, setResult] = useState(null);

  const optimize = async (b) => {
    const res = await api.post("/investment/optimize", { budget: b });
    setResult(res.data);
  };

  useEffect(() => {
    optimize(budget);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span className="text-xs font-semibold text-primary">INVESTMENT OPTIMIZATION MODULE</span>
      <h1 className="text-2xl font-bold mt-1">Maximize risk reduction per dollar</h1>
      <p className="text-sm text-gray-500 mb-5">Knapsack-optimized control selection with live ROSI and diminishing-returns curve.</p>

      <div className="card mb-5 flex items-center justify-between">
        <div className="flex-1">
          <div className="label-small mb-1">Security Budget</div>
          <div className="text-2xl font-bold mb-2">${(budget / 1000).toFixed(1)}K</div>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="50000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <button onClick={() => optimize(budget)} className="ml-6 bg-primary text-white px-4 py-2 rounded-lg text-sm">
          Re-optimize
        </button>
        {result && (
          <div className="flex gap-3 ml-6">
            <div className="border rounded-lg px-4 py-2 text-center">
              <div className="font-bold text-primary">{result.rosi.toFixed(1)}%</div>
              <div className="text-[10px] text-gray-500">ROSI</div>
            </div>
            <div className="border rounded-lg px-4 py-2 text-center">
              <div className="font-bold text-green-600">${(result.lossAvoided / 1000000).toFixed(2)}M</div>
              <div className="text-[10px] text-gray-500">LOSS AVOIDED</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="card">
          <div className="label-small mb-1">Efficient Frontier</div>
          <div className="font-semibold mb-3">Investment vs risk reduction</div>
          {result && (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={result.frontier}>
                <XAxis dataKey="spend" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Line type="monotone" dataKey="reduction" stroke="#1a73e8" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <p className="text-xs text-gray-400 mt-2">Notice diminishing returns beyond the optimal spend zone.</p>
        </div>

        <div className="card">
          <div className="label-small mb-1">AI-Recommended Stack</div>
          <div className="font-semibold mb-3">
            {result?.recommended.length || 0} controls · ${((result?.spent || 0) / 1000).toFixed(0)}K
          </div>
          <div className="max-h-72 overflow-y-auto">
            {result?.recommended.map((c) => (
              <div key={c._id} className="flex justify-between items-center border-b last:border-0 py-2">
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-[10px] text-gray-400">{c.framework} · {c.clause}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">${(c.cost / 1000).toFixed(0)}K</div>
                  <div className="text-[10px] text-green-600">{c.efficacy}% efficacy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
