"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Executive Dashboard" },
  { href: "/dashboard/risk", label: "Risk Quantification" },
  { href: "/dashboard/investment", label: "Investment & ROSI" },
  { href: "/dashboard/simulator", label: "Scenario Simulator" },
  { href: "/dashboard/compliance", label: "Compliance Matrix" },
  { href: "/dashboard/ai", label: "AI Risk Q&A" },
  { href: "/dashboard/reports", label: "Audit Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="w-60 border-r bg-white min-h-screen flex flex-col justify-between fixed">
      <div>
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <div>
            <div className="font-bold leading-none">Cetrix</div>
            <div className="text-[9px] text-gray-500">CYBER RISK QUANTIFIED</div>
          </div>
        </div>
        <nav className="mt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-5 py-2.5 text-sm ${
                pathname === l.href
                  ? "bg-blue-50 text-primary font-medium border-r-2 border-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-5 py-4 border-t">
        <div className="text-sm font-semibold">{user?.fullName || "User"}</div>
        <div className="text-xs text-gray-500 mb-2">{user?.role || ""}</div>
        <button onClick={logout} className="text-xs text-red-500">Log out</button>
      </div>
    </aside>
  );
}
