"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";

const personas = [
  { role: "CISO", name: "Sarah Chen", email: "ciso@demo.com" },
  { role: "RISK ANALYST", name: "Raj Patel", email: "analyst@demo.com" },
  { role: "EXECUTIVE / CFO", name: "Michael Ross", email: "cfo@demo.com" },
  { role: "AUDITOR", name: "Elena Volkov", email: "auditor@demo.com" },
];

export default function Login() {
  const [email, setEmail] = useState("ciso@demo.com");
  const [password, setPassword] = useState("Demo@1234");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      <div className="grid grid-cols-2 gap-16 max-w-4xl w-full items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <span className="font-bold text-lg">Cetrix</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-3">
            Board-grade cyber risk, <span className="text-primary">continuously.</span>
          </h1>
          <p className="text-gray-600 mb-6 text-sm">
            Sign in with a demo persona to explore the platform end-to-end. Every workspace is
            pre-populated with realistic asset, vulnerability, control and telemetry data.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {personas.map((p) => (
              <button
                key={p.email}
                type="button"
                onClick={() => setEmail(p.email)}
                className="border rounded-lg p-3 text-left bg-white hover:border-primary"
              >
                <div className="text-[10px] font-semibold text-gray-400">{p.role}</div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-gray-500">{p.email}</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-3">
            Password for all personas: <span className="font-mono bg-gray-100 px-1 rounded">Demo@1234</span>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-5">Access your enterprise risk workspace.</p>
          <form onSubmit={handleSubmit}>
            <label className="text-sm font-medium">Work email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
              required
            />
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
              required
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium">
              Sign in →
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            New to Cetrix? <Link href="/signup" className="text-primary font-medium">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
