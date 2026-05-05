import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { QueryMessage } from './QueryMessage';

interface Message {
  id: string;
  question: string;
  sql: string;
  result: Record<string, any>[];
  explanation: string;
  isError?: boolean;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // 1. Generate SQL
      const res1 = await fetch("http://127.0.0.1:8000/generate-sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: input })
      });

      const data1 = await res1.json();

      const cleanSQL = data1.result
        .replace(/```sql/g, "")
        .replace(/```/g, "")
        .trim();

      // 2. Run SQL
      const res2 = await fetch("http://127.0.0.1:8000/run-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sql: cleanSQL })
      });

      const data2 = await res2.json();

      // 3. Update UI
      const newMessage: Message = {
        id: Date.now().toString(),
        question: input,
        sql: cleanSQL,
        result: data2.data,
        explanation: "AI + MySQL result"
      };

      setMessages((prev) => [...prev, newMessage]);
      setInput("");

    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-black via-black to-blue-950/20">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI SQL Assistant</h1>
            <p className="text-xs text-white/50">Ask your database in natural language</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-white/50">
            Ask something like: <br />
            <b>show all employees</b>
          </div>
        )}

        {messages.map((message) => (
          <QueryMessage key={message.id} {...message} />
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-400" />
              <span className="text-sm text-white/60">Generating SQL...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your database in English..."
            className="w-full px-4 py-4 pr-12 rounded-xl bg-white/10 border border-white/20 text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}