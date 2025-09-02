import React from 'react';
type Column<T> = { id: string; label: string; accessor: (row: T) => React.ReactNode };

export default function DataTable<T>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  return (
    <table className="min-w-full table-auto">
      <thead className="text-left text-xs uppercase text-gray-400">
        <tr>{columns.map((c) => (<th key={c.id} className="px-3 py-2">{c.label}</th>))}</tr>
      </thead>
      <tbody>
        {data.map((row: any, idx) => (
          <tr key={idx} className="border-t border-gray-800">
            {columns.map((c) => (<td key={c.id} className="px-3 py-2 align-top">{c.accessor(row)}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
