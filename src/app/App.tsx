import { useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { ChatPanel } from "./components/ChatPanel";
import { RightPanel } from "./components/RightPanel";
import Dashboard from "../dashboard/Dashboard";

export default function App() {
  const [chartData, setChartData] = useState([]);

  const reasoning = [
    "Parsing query",
    "Generating SQL",
    "Executing DB",
    "Returning result",
  ];

  return (
    <div className="w-full h-screen flex bg-black text-white">
      <LeftSidebar />
      <ChatPanel onData={setChartData} />
      <RightPanel status="success" reasoning={reasoning} />

      {/* 🔥 LIVE DASHBOARD */}
      <div className="absolute right-0 top-0 w-[400px] h-full border-l border-white/10 bg-black/80">
        <Dashboard data={chartData} />
      </div>
    </div>
  );
}
