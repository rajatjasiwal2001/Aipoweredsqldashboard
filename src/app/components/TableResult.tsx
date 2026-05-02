interface TableResultProps {
  data: Record<string, any>[];
}

export function TableResult({ data }: TableResultProps) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-white/40">
        <p>No results found</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-auto max-h-96">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-black/60 backdrop-blur-sm">
          <tr className="border-b border-white/20">
            {columns.map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
              {columns.map(col => (
                <td key={col} className="px-4 py-3 text-white/80 font-mono text-xs">
                  {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-white/30">NULL</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
