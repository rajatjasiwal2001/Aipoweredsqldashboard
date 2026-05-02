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

const mockMessages: Message[] = [
  {
    id: '1',
    question: 'Show me all users created in the last 30 days',
    sql: 'SELECT * FROM users WHERE created_at >= NOW() - INTERVAL \'30 days\' ORDER BY created_at DESC;',
    result: [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', created_at: '2026-04-15' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', created_at: '2026-04-20' },
      { id: 3, name: 'Carol White', email: 'carol@example.com', created_at: '2026-04-25' },
    ],
    explanation: 'This query retrieves all user records where the creation date is within the last 30 days. The NOW() function gets the current timestamp, and we subtract 30 days using INTERVAL. Results are sorted by creation date in descending order.',
  },
  {
    id: '2',
    question: 'What are the top 5 products by sales?',
    sql: 'SELECT p.name, SUM(o.total) as total_sales FROM products p JOIN orders o ON p.id = o.product_id GROUP BY p.id, p.name ORDER BY total_sales DESC LIMIT 5;',
    result: [
      { name: 'Laptop Pro', total_sales: 45600 },
      { name: 'Wireless Mouse', total_sales: 23400 },
      { name: 'USB-C Cable', total_sales: 18900 },
      { name: 'Monitor 4K', total_sales: 15300 },
      { name: 'Keyboard Mechanical', total_sales: 12700 },
    ],
    explanation: 'This query joins the products and orders tables to calculate total sales per product. We use SUM() to aggregate sales amounts and GROUP BY to group results by product. The ORDER BY clause sorts by total sales, and LIMIT 5 returns only the top 5 results.',
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        question: input,
        sql: 'SELECT COUNT(*) as total_count FROM users WHERE status = \'active\';',
        result: [{ total_count: 1247 }],
        explanation: 'This query counts all users with an active status by using the COUNT(*) aggregate function with a WHERE clause filter.',
      };

      setMessages([...messages, newMessage]);
      setInput('');
      setIsLoading(false);
    }, 1500);
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
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center mx-auto">
                <Sparkles size={32} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl text-white/80 mb-2">Start a conversation</h2>
                <p className="text-sm text-white/50">Ask questions about your database in plain English</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {['Show all users', 'Top 10 customers', 'Monthly sales report', 'Active orders count'].map(example => (
                  <button
                    key={example}
                    onClick={() => setInput(example)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map(message => (
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
              <span className="text-sm text-white/60">Generating SQL query...</span>
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
            className="w-full px-4 py-4 pr-12 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 text-white placeholder-white/40 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-xs text-white/30 mt-2 text-center">
          AI can make mistakes. Always verify critical queries.
        </p>
      </div>
    </div>
  );
}
