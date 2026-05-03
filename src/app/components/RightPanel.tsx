import { CheckCircle2, XCircle, Loader2, Database, Lightbulb } from 'lucide-react';

interface RightPanelProps {
  status: 'idle' | 'loading' | 'success' | 'error' | 'fixed';
  reasoning?: string[];
}

const mockSchema = [
  { table: 'users', columns: ['id', 'name', 'email', 'created_at'] },
  { table: 'orders', columns: ['id', 'user_id', 'total', 'status'] },
  { table: 'products', columns: ['id', 'name', 'price', 'stock'] },
  { table: 'sales', columns: ['id', 'region', 'amount', 'date'] },
];

export function RightPanel({ status, reasoning = [] }: RightPanelProps) {
  return (
    <div className="w-96 h-full bg-black/40 backdrop-blur-xl border-l border-white/10 flex flex-col overflow-hidden">
      {/* Execution Status */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/70 mb-3">Execution Status</h3>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          {status === 'idle' && (
            <div className="flex items-center gap-2 text-white/50">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <span className="text-sm">Waiting for query...</span>
            </div>
          )}
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-blue-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Processing query...</span>
            </div>
          )}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 size={16} />
              <span className="text-sm">Query executed successfully</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400">
              <XCircle size={16} />
              <span className="text-sm">Query failed</span>
            </div>
          )}
          {status === 'fixed' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <CheckCircle2 size={16} />
                <span className="text-sm">Auto-fixed and executed</span>
              </div>
              <div className="px-2 py-1 rounded bg-purple-500/20 border border-purple-400/30">
                <span className="text-xs text-purple-300">AI Error Fix Applied</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Database Schema */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Database size={16} className="text-white/70" />
          <h3 className="text-sm font-medium text-white/70">Database Schema</h3>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {mockSchema.map(table => (
            <div key={table.table} className="p-2 rounded bg-white/5 border border-white/5">
              <p className="text-xs font-mono text-blue-300 mb-1">{table.table}</p>
              <p className="text-xs text-white/40">{table.columns.length} columns</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Reasoning Steps */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-white/70" />
          <h3 className="text-sm font-medium text-white/70">AI Reasoning</h3>
        </div>
        {reasoning.length > 0 ? (
          <div className="space-y-2">
            {reasoning.map((step, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">{idx + 1}</span>
                </div>
                <p className="text-xs text-white/70 pt-1">{step}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-white/40">No reasoning steps available</p>
        )}
      </div>
    </div>
  );
}
