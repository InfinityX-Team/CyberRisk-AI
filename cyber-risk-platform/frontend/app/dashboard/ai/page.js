"use client";

import { useState } from "react";
import api from "../../../lib/api";

const suggestions = [
  "What is our highest financial cyber risk today?",
  "Which vulnerabilities contribute most to expected losses?",
  "What happens to our EAL if we roll out MFA on all privileged accounts?",
  "How does a 30-day patching delay affect our exposure?",
  "Give me a 60-second board summary of our cyber risk posture.",
];

export default function AiQA() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your CyberRisk AI. I have live access to your Expected Annual Loss, Value-at-Risk, controls, and vulnerabilities. Ask me anything — I answer in dollars and business terms." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async (q) => {
    const question = q || input;
    if (!question.trim()) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/ai/ask", { question });
      setMessages((m) => [...m, { role: "ai", text: res.data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Sorry, something went wrong." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <span className="text-xs font-semibold text-primary">AI DECISION SUPPORT</span>
      <h1 className="text-2xl font-bold mt-1">Ask CyberRisk AI</h1>
      <p className="text-sm text-gray-500 mb-5">Natural-language answers grounded in live enterprise risk data.</p>

      <div className="card min-h-[400px] flex flex-col">
        <div className="flex-1 space-y-3 mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-xs text-gray-400">CyberRisk AI is thinking...</div>}
        </div>

        <div className="flex gap-2 flex-wrap mb-3">
          {suggestions.map((s) => (
            <button key={s} onClick={() => ask(s)} className="text-xs border rounded-full px-3 py-1.5 text-gray-600 hover:border-primary">
              ✨ {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask about ALE, VaR, ROSI, controls, scenarios..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <button onClick={() => ask()} className="bg-primary text-white px-4 py-2 rounded-lg text-sm">➤</button>
        </div>
      </div>
    </div>
  );
}
