import { History, Bookmark, Database } from 'lucide-react';
import { useState } from 'react';

interface Query {
  id: string;
  question: string;
  sql: string;
  timestamp: string;
}

interface Schema {
  table: string;
  columns: string[];
}

const mockHistory: Query[] = [
  { id: '1', question: 'Show all users', sql: 'SELECT * FROM users', timestamp: '2 mins ago' },
  { id: '2', question: 'Total sales by region', sql: 'SELECT region, SUM(amount) FROM sales GROUP BY region', timestamp: '15 mins ago' },
  { id: '3', question: 'Top 10 customers', sql: 'SELECT * FROM customers ORDER BY total_spent DESC LIMIT 10', timestamp: '1 hour ago' },
];

const mockSaved: Query[] = [
  { id: 's1', question: 'Monthly revenue report', sql: 'SELECT DATE_TRUNC(\'month\', date) as month, SUM(revenue) FROM sales GROUP BY month', timestamp: 'Saved' },
  { id: 's2', question: 'Active users count', sql: 'SELECT COUNT(*) FROM users WHERE status = \'active\'', timestamp: 'Saved' },
];

const mockSchema: Schema[] = [
  { table: 'users', columns: ['id', 'name', 'email', 'created_at'] },
  { table: 'orders', columns: ['id', 'user_id', 'total', 'status'] },
  { table: 'products', columns: ['id', 'name', 'price', 'stock'] },
  { table: 'sales', columns: ['id', 'region', 'amount', 'date'] },
];

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'schema'>('history');

  return (
    <div className="w-80 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-400'
              : 'hover:bg-white/5'
          }`}
        >
          <History size={18} />
          <span className="text-sm">History</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all ${
            activeTab === 'saved'
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-400'
              : 'hover:bg-white/5'
          }`}
        >
          <Bookmark size={18} />
          <span className="text-sm">Saved</span>
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all ${
            activeTab === 'schema'
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-400'
              : 'hover:bg-white/5'
          }`}
        >
          <Database size={18} />
          <span className="text-sm">Schema</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === 'history' && mockHistory.map(query => (
          <div
            key={query.id}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all group"
          >
            <p className="text-sm text-white/90 truncate group-hover:text-blue-300">{query.question}</p>
            <p className="text-xs text-white/50 mt-1">{query.timestamp}</p>
          </div>
        ))}

        {activeTab === 'saved' && mockSaved.map(query => (
          <div
            key={query.id}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all group"
          >
            <p className="text-sm text-white/90 truncate group-hover:text-purple-300">{query.question}</p>
            <p className="text-xs text-white/50 mt-1">{query.timestamp}</p>
          </div>
        ))}

        {activeTab === 'schema' && mockSchema.map(table => (
          <div
            key={table.table}
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <p className="text-sm font-mono text-blue-300 mb-2">{table.table}</p>
            <div className="space-y-1">
              {table.columns.map(col => (
                <p key={col} className="text-xs text-white/60 font-mono pl-3">└ {col}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
