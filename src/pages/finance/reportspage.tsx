// src/pages/finance/ReportsPage.tsx
import React, { useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { buildTrialBalance, buildPL, buildBalanceSheet } from '../../utils/finance';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { exportCsv } from '../../utils/csv';
import PLChart from '../../components/charts/PLChart';
import CashFlowChart from '../../components/charts/CashFlowChart';
import { recompute } from '../../features/finance/trial.slice';
import { ledgerApi } from '../../features/finance/ledger.service';
import { loadEntries } from '../../features/finance/ledger.slice';

export default function ReportsPage() {
  const dispatch = useAppDispatch();
  const ledgerEntries = useAppSelector((s: any) => s.ledger?.entries || []);
  const invoices = useAppSelector((s: any) => s.invoices?.items || []);
  const trialBalances = useAppSelector((s: any) => (s as any).trial?.balances || {});

  // Load ledger entries from service (fallback to mock)
  useEffect(() => {
    async function load() {
      try {
        const items = await ledgerApi.list();
        dispatch(loadEntries(items));
        dispatch(recompute(items));
      } catch (e) {
        // service handles fallback; but we still recompute using existing entries
        dispatch(recompute(ledgerEntries));
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // account map - in production this should be pulled from accounts master
  const accountMap: Record<string, string> = {
    AR: 'Accounts Receivable',
    CASH: 'Cash',
    BANK: 'Bank',
    SALES: 'Sales Revenue',
    TAX_PAYABLE: 'Tax Payable',
    EXP_RENT: 'Rent Expense',
    EXP_SALARY: 'Salary Expense',
    INVENTORY: 'Inventory',
    AP: 'Accounts Payable',
    EQUITY: 'Equity'
  };

  const trial = useMemo(() => buildTrialBalance(ledgerEntries, accountMap), [ledgerEntries]);

  const revenueAccounts = ['SALES'];
  const expenseAccounts = ['EXP_RENT', 'EXP_SALARY'];

  const pl = useMemo(() => buildPL(trial, revenueAccounts, expenseAccounts), [trial]);

  const bs = useMemo(() => buildBalanceSheet(trial, ['CASH', 'BANK', 'AR', 'INVENTORY'], ['AP', 'TAX_PAYABLE'], ['EQUITY']), [trial]);

  // prepare chart data - simple monthly grouping based on invoices createdAt (fallback to single period)
  const plChartData = useMemo(() => {
    // group invoices by month-year
    const map: Record<string, { revenue: number; expenses: number }> = {};
    const add = (k: string, rev = 0, exp = 0) => {
      map[k] = map[k] || { revenue: 0, expenses: 0 };
      map[k].revenue += rev;
      map[k].expenses += exp;
    };
    invoices.forEach((inv: any) => {
      const d = new Date(inv.createdAt || inv.date || Date.now());
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      add(key, inv.subtotal || 0, 0);
    });
    // ledger expense lines approximate
    ledgerEntries.forEach((e: any) => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      e.lines.forEach((l: any) => {
        if (String(l.accountId).startsWith('EXP')) add(key, 0, l.debit - l.credit);
      });
    });
    const rows = Object.keys(map).sort().map((k) => ({ period: k, revenue: map[k].revenue, expenses: map[k].expenses, net: map[k].revenue - map[k].expenses }));
    // if empty, provide at least one row from current PL
    if (rows.length === 0) return [{ period: 'current', revenue: pl.revenue, expenses: pl.operatingExpenses, net: pl.netIncome }];
    return rows;
  }, [invoices, ledgerEntries, pl]);

  // cash flow chart data: one point for direct and indirect net cash
  const cashFlowChartData = useMemo(() => {
    // direct: receipts - payments computed roughly:
    const receipts = (invoices || []).reduce((s: number, inv: any) => s + (inv.paidAmount || 0), 0);
    let payments = 0;
    ledgerEntries.forEach((e: any) => {
      e.lines.forEach((l: any) => {
        if (['CASH', 'BANK'].includes(String(l.accountId))) {
          payments += l.credit || 0;
        }
      });
    });
    const directNet = receipts - payments;
    const indirectNet = pl.netIncome; // simplified indirect

    return [{ label: 'Net Cash', direct: directNet, indirect: indirectNet }];
  }, [invoices, ledgerEntries, pl]);

  // trial table
  const trialColumns = [
    { id: 'account', label: 'Account', accessor: (r: any) => r.accountName },
    { id: 'debit', label: 'Debit', accessor: (r: any) => r.debit.toFixed(2) },
    { id: 'credit', label: 'Credit', accessor: (r: any) => r.credit.toFixed(2) },
    { id: 'balance', label: 'Balance', accessor: (r: any) => r.balance.toFixed(2) }
  ];

  const trialRows = trial;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Financial Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button onClick={() => exportCsv('trial-balance.csv', trialRows)}>Export Trial</Button>
          <Button onClick={() => exportCsv('pl.csv', [{ revenue: pl.revenue, netIncome: pl.netIncome }])}>Export P&L</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <PLChart data={plChartData as any} />
          <CashFlowChart data={cashFlowChartData as any} />
        </div>

        <div className="col-span-1 space-y-4">
          <div className="bg-surface p-4 rounded-2xl">
            <h3 className="font-semibold">Profit & Loss (Summary)</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between"><div>Revenue</div><div>{pl.revenue.toFixed(2)}</div></div>
              <div className="flex justify-between"><div>Expenses</div><div>{pl.cogs + pl.operatingExpenses}</div></div>
              <div className="flex justify-between font-semibold"><div>Net Income</div><div>{pl.netIncome.toFixed(2)}</div></div>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-2xl">
            <h3 className="font-semibold">Balance Sheet (Summary)</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between"><div>Assets</div><div>{bs.assets.toFixed(2)}</div></div>
              <div className="flex justify-between"><div>Liabilities</div><div>{bs.liabilities.toFixed(2)}</div></div>
              <div className="flex justify-between font-semibold"><div>Equity</div><div>{bs.equity.toFixed(2)}</div></div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-surface p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Trial Balance</h2>
        {trialRows.length === 0 ? <EmptyState title="No trial data" /> : <DataTable columns={trialColumns as any} data={trialRows as any} />}
      </section>
    </div>
  );
}
