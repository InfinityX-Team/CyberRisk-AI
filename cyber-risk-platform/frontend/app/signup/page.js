"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CISO");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/signup", { fullName, email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      <div className="card w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-bold text-lg">Cetrix</span>
        </div>
        <h2 className="text-xl font-bold mb-1">Create your workspace</h2>
        <p className="text-sm text-gray-500 mb-5">Start quantifying cyber risk in minutes.</p>

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-medium">Full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
            required
          />
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
          <label className="text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
          >
            <option>CISO</option>
            <option>Risk Analyst</option>
            <option>Executive</option>
            <option>Auditor</option>
          </select>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium">
            Create account
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Have an account? <Link href="/login" className="text-primary font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
