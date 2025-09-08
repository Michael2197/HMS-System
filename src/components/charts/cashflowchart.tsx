// src/components/charts/CashFlowChart.tsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

type Datum = { label: string; direct: number; indirect: number };

export default function CashFlowChart({ data }: { data: Datum[] }) {
  return (
    <div className="bg-surface p-4 rounded-2xl">
      <h4 className="font-semibold mb-2">Cash Flow (Direct vs Indirect)</h4>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value: any) => Number(value).toFixed(2)} />
            <Legend />
            <Bar dataKey="direct" name="Direct Net Cash" />
            <Bar dataKey="indirect" name="Indirect Net Cash" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
