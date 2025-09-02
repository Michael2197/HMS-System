// src/components/charts/PLChart.tsx
import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

type Datum = { period: string; revenue: number; expenses: number; net: number };

export default function PLChart({ data }: { data: Datum[] }) {
  return (
    <div className="bg-surface p-4 rounded-2xl">
      <h4 className="font-semibold mb-2">P&L (Revenue vs Expenses)</h4>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value: any) => Number(value).toFixed(2)} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" barSize={20} />
            <Bar dataKey="expenses" name="Expenses" barSize={20} />
            <Line dataKey="net" name="Net" stroke="#FFD700" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
