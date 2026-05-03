import SalaryChart from "./SalaryChart";

export default function LiveDashboard({ data = [] }) {
  return (
    <div className="p-4 text-white bg-black h-full overflow-y-auto">
      
      <h2 className="text-xl font-bold mb-4">
        📊 Live Dashboard
      </h2>

      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
        <SalaryChart data={data} />
      </div>

    </div>
  );
}