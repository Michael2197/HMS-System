// src/pages/finance/BalanceSheetPage.tsx
import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { buildTrialBalance, buildBalanceSheet } from '../../utils/finance';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { exportCsv } from '../../utils/csv';

export default function BalanceSheetPage() {
  const entries = useAppSelector((s: any) => s.ledger?.entries || []);

  const accountMap: Record<string, string> = {
    CASH: 'Cash',
    BANK: 'Bank',
    AR: 'Accounts Receivable',
    AP: 'Accounts Payable',
    INVENTORY: 'Inventory',
    PPE: 'Property Plant & Equipment',
    EQUITY: 'Equity',
    LOANS: 'Loans'
  };

  const trial = useMemo(() => buildTrialBalance(entries, accountMap), [entries]);

  const assets = ['CASH', 'BANK', 'AR', 'INVENTORY', 'PPE'];
  const liabilities = ['AP', 'LOANS'];
  const equity = ['EQUITY'];

  const bs = useMemo(() => buildBalanceSheet(trial, assets, liabilities, equity), [trial]);

  const assetRows = trial.filter((r) => assets.includes(r.accountId));
  const liabilityRows = trial.filter((r) => liabilities.includes(r.accountId));
  const equityRows = trial.filter((r) => equity.includes(r.accountId));

  const columns = [
    { id: 'account', label: 'Account', accessor: (r: any) => r.accountName },
    { id: 'balance', label: 'Balance', accessor: (r: any) => r.balance.toFixed(2) }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Balance Sheet</h1>
        <div className="flex gap-2">
          <Button onClick={() => exportCsv('balance-sheet-assets.csv', assetRows)}>Export Assets</Button>
          <Button onClick={() => exportCsv('balance-sheet-liabilities.csv', liabilityRows)}>Export Liabilities</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-surface p-4 rounded-2xl">
          <h3 className="font-semibold">Assets</h3>
          {assetRows.length === 0 ? <EmptyState title="No assets" /> : <DataTable columns={columns as any} data={assetRows as any} />}
          <div className="mt-4 font-semibold">Total Assets: {bs.assets.toFixed(2)}</div>
        </div>

        <div className="bg-surface p-4 rounded-2xl">
          <h3 className="font-semibold">Liabilities</h3>
          {liabilityRows.length === 0 ? <EmptyState title="No liabilities" /> : <DataTable columns={columns as any} data={liabilityRows as any} />}
          <div className="mt-4 font-semibold">Total Liabilities: {bs.liabilities.toFixed(2)}</div>
        </div>

        <div className="bg-surface p-4 rounded-2xl">
          <h3 className="font-semibold">Equity</h3>
          {equityRows.length === 0 ? <EmptyState title="No equity" /> : <DataTable columns={columns as any} data={equityRows as any} />}
          <div className="mt-4 font-semibold">Total Equity: {bs.equity.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
