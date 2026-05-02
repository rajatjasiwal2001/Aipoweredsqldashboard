import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'motion/react';
import { TableResult } from './TableResult';

interface QueryMessageProps {
  question: string;
  sql: string;
  result: Record<string, any>[];
  explanation: string;
  isError?: boolean;
}

export function QueryMessage({ question, sql, result, explanation, isError = false }: QueryMessageProps) {
  const [activeView, setActiveView] = useState<'sql' | 'result'>('result');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* User Question */}
      <div className="flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
        >
          <p className="text-sm text-white/90">{question}</p>
        </motion.div>
      </div>

      {/* AI Response */}
      <div className="flex justify-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl w-full space-y-3"
        >
          {/* Toggle Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('sql')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeView === 'sql'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              SQL View
            </button>
            <button
              onClick={() => setActiveView('result')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeView === 'result'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Result View
            </button>
          </div>

          {/* SQL Query */}
          {activeView === 'sql' && (
            <div className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <span className="text-xs text-white/60 font-mono">Generated SQL Query</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition-colors text-xs text-white/60 hover:text-white/90"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <SyntaxHighlighter
                language="sql"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '16px',
                  background: 'transparent',
                  fontSize: '13px',
                }}
              >
                {sql}
              </SyntaxHighlighter>
            </div>
          )}

          {/* Query Result */}
          {activeView === 'result' && (
            <div className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-2 border-b border-white/10 bg-white/5">
                <span className="text-xs text-white/60 font-mono">
                  {isError ? 'Error' : `Results (${result.length} rows)`}
                </span>
              </div>
              {isError ? (
                <div className="p-6 text-center">
                  <p className="text-red-400 text-sm">Query execution failed</p>
                </div>
              ) : (
                <TableResult data={result} />
              )}
            </div>
          )}

          {/* Explanation */}
          <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
            <p className="text-xs text-white/50 mb-2">Explanation</p>
            <p className="text-sm text-white/80 leading-relaxed">{explanation}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
