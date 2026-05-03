import SalaryChart from "../components/SalaryChart";

export default function Dashboard({ data = [] }) {
  const totalSalary = data.reduce((a, b) => a + (b.salary || 0), 0);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/10 p-3 rounded">Users: {data.length}</div>
        <div className="bg-white/10 p-3 rounded">Salary: ₹{totalSalary}</div>
        <div className="bg-white/10 p-3 rounded">Live Data</div>
      </div>

      <SalaryChart data={data} />
    </div>
  );
}