import { useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { ChatPanel } from "./components/ChatPanel";
import { RightPanel } from "./components/RightPanel";

export default function App() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "fixed"
  >("success");
  const [reasoning] = useState<string[]>([
    "Analyzing user question to identify key entities",
    "Mapping natural language to database schema",
    "Identifying required tables: users, created_at column",
    "Generating SQL with date filter using INTERVAL",
    "Optimizing query with proper indexing hints",
    "Validating SQL syntax and executing query",
  ]);

  return (
    <div className="size-full flex bg-black text-white">
      <LeftSidebar />
      <ChatPanel />
      <RightPanel status={status} reasoning={reasoning} />
    </div>
  );
}