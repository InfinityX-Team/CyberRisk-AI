import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between px-10 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <div>
            <div className="font-bold text-lg leading-none">Cetrix</div>
            <div className="text-[10px] text-gray-500 tracking-wide">CYBER RISK QUANTIFIED</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>Platform</span>
          <span>Modules</span>
          <span>Frameworks</span>
          <span>ROSI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-700">Sign in</Link>
          <Link href="/signup" className="bg-primary text-white text-sm px-4 py-2 rounded-lg">Get started</Link>
        </div>
      </nav>

      <section className="px-10 py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="grid grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          <div>
            <span className="inline-block text-xs font-semibold text-primary bg-blue-100 px-3 py-1 rounded-full mb-4">
              AI DECISION SUPPORT LAYER
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              Quantify cyber risk in <span className="text-primary">financial terms.</span> Optimize every security dollar.
            </h1>
            <p className="text-gray-600 mb-6">
              Move beyond Low/Medium/High labels. Cetrix continuously calculates Expected Annual Loss,
              Value-at-Risk, and ROSI by correlating telemetry with business asset criticality — so CISOs,
              CFOs and boards make data-driven investment decisions.
            </p>
            <div className="flex gap-3">
              <Link href="/signup" className="bg-primary text-white px-5 py-3 rounded-lg text-sm font-medium">
                Launch demo workspace →
              </Link>
              <Link href="/login" className="border px-5 py-3 rounded-lg text-sm font-medium">
                Sign in with demo persona
              </Link>
            </div>
            <div className="flex gap-4 mt-6 text-xs text-gray-500">
              <span>● LIVE TELEMETRY</span><span>NIST CSF 2.0</span><span>ISO 27001:2022</span><span>RBI · SEBI</span><span>FAIR ALIGNED</span>
            </div>
          </div>

          <div className="card">
            <div className="label-small mb-1">Live Financial Exposure</div>
            <div className="text-3xl font-bold mb-4">$4.82M <span className="text-xs text-red-500 font-normal">-18% MoM</span></div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border rounded-lg p-2 text-center">
                <div className="text-lg font-bold">63</div>
                <div className="text-[10px] text-gray-500">SCORE</div>
              </div>
              <div className="border rounded-lg p-2 text-center">
                <div className="text-lg font-bold">$9.4M</div>
                <div className="text-[10px] text-gray-500">VAR 95%</div>
              </div>
              <div className="border rounded-lg p-2 text-center">
                <div className="text-lg font-bold">52%</div>
                <div className="text-[10px] text-gray-500">CONTROLS</div>
              </div>
            </div>
            {[["Trading Engine", "$1.9M"], ["Customer PIIDB", "$1.3M"], ["Payment Gateway", "$980K"]].map(([n, v]) => (
              <div key={n} className="flex justify-between text-xs py-1 text-gray-600">
                <span>{n}</span><span className="font-semibold text-gray-800">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 text-center py-10 border-y bg-white">
        {[["$4.82M", "AVG. ALE REDUCED PER CLIENT"], ["312%", "MEDIAN ROSI IN YEAR 1"], ["< 4s", "CONTINUOUS RISK RECOMPUTE"], ["5+", "FRAMEWORKS MAPPED NATIVELY"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-2xl font-bold text-primary">{v}</div>
            <div className="text-[11px] text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </section>

      <section className="px-10 py-16 max-w-6xl mx-auto">
        <span className="text-xs font-semibold text-primary">MODULES</span>
        <h2 className="text-3xl font-bold mt-2 mb-8">A full risk-to-dollar operating system</h2>
        <div className="grid grid-cols-3 gap-5">
          {[
            ["Risk Quantification", "Continuous ALE, LEF, and SLE per asset, business unit and enterprise."],
            ["Investment Optimization", "Knapsack optimizer picks controls that maximize ROSI under your budget."],
            ["Monte Carlo Simulator", "Model what-if scenarios: MFA, patch SLA, zero-trust, EDR coverage."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="font-semibold mb-2">{t}</div>
              <p className="text-sm text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-gray-400 py-8 border-t">
        Built for SIH — AI-Powered Continuous Cyber Risk Quantification and Investment Optimization Platform
      </footer>
    </div>
  );
}
