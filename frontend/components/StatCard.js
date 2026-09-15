export default function StatCard({ label, value, sub, subColor }) {
  return (
    <div className="card">
      <div className="label-small mb-2">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className={`text-xs mt-1 ${subColor || "text-gray-500"}`}>{sub}</div>}
    </div>
  );
}
