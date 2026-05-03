import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { QueryMessage } from "./QueryMessage";
import { generateSQL, runQuery } from "../../services/api";

export function ChatPanel({ onData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const res = await generateSQL(input);
      const sql = res.result.replace(/```sql|```/g, "");

      const dataRes = await runQuery(sql);

      // 🔥 CLEAN DATA for dashboard
      const cleanData = (dataRes.data || []).map((row) => ({
        name: row.name,
        salary: Number(row.salary),
      }));

      onData?.(cleanData);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          question: input,
          sql,
          result: cleanData,
          explanation: "Generated using AI",
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black text-white">
      <div className="p-4 border-b border-white/10 font-semibold">
        AI SQL Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <QueryMessage key={m.id} {...m} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-white/60">
            <Loader2 className="animate-spin" size={16} />
            Generating SQL...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex gap-2 border-t border-white/10">
        <input
          className="flex-1 p-2 bg-white/10 rounded text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask database..."
        />
        <button className="bg-blue-500 px-4 rounded">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}