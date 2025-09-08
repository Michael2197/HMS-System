// src/pages/finance/IncomeStatementPage.tsx
import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { buildTrialBalance, buildPL } from '../../utils/finance';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { exportCsv } from '../../utils/csv';

export default function IncomeStatementPage() {
  const entries = useAppSelector((s: any) => s.ledger?.entries || []);
  // account map
  const accountMap: Record<string, string> = {
    SALES: 'Sales Revenue',
    COGS: 'Cost of Goods Sold',
    EXP_RENT: 'Rent Expense',
    EXP_SALARY: 'Salary Expense',
    EXP_OTHER: 'Other Expense'
  };

  const trial = useMemo(() => buildTrialBalance(entries, accountMap), [entries]);

  const revenueAccounts = ['SALES'];
  const expenseAccounts = ['COGS', 'EXP_RENT', 'EXP_SALARY', 'EXP_OTHER'];

  const pl = useMemo(() => buildPL(trial, revenueAccounts, expenseAccounts), [trial]);

  const rows = [
    { id: 'revenue', label: 'Revenue', value: pl.revenue },
    { id: 'cogs', label: 'Cost of Goods Sold', value: pl.cogs },
    { id: 'gross', label: 'Gross Profit', value: pl.grossProfit },
    { id: 'op', label: 'Operating Expenses', value: pl.operatingExpenses },
    { id: 'net', label: 'Net Income', value: pl.netIncome }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Income Statement (P&L)</h1>
        <div className="flex gap-2">
          <Button onClick={() => exportCsv('income-statement.csv', rows)}>Export CSV</Button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-2xl">
        {rows.length === 0 ? <EmptyState title="No data" /> : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="flex justify-between">
                <div>{r.label}</div>
                <div className="font-semibold">{r.value.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
