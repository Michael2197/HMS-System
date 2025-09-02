import React from 'react';
export default function Pagination({ page, onChange }: { page: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(1, page - 1))} className="px-3 py-1 bg-gray-800 rounded">Prev</button>
      <div className="px-3 py-1 bg-gray-900 rounded">Page {page}</div>
      <button onClick={() => onChange(page + 1)} className="px-3 py-1 bg-gray-800 rounded">Next</button>
    </div>
  );
}
