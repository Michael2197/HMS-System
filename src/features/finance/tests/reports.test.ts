// tests/finance/reports.test.ts
import { describe, it, expect } from 'vitest';
import { buildTrialBalance, buildPL, buildBalanceSheet } from '../../src/utils/finance';
import { cashFlowFromData } from '../../src/features/finance/reports.service';
import type { JournalEntry, Invoice } from '../../src/types/finance';

describe('Finance reports calculations', () => {
  it('builds trial balance correctly', () => {
    const entries: JournalEntry[] = [
      {
        id: 'e1',
        date: new Date().toISOString(),
        description: 'Sale',
        lines: [
          { id: 'l1', accountId: 'AR', debit: 1000, credit: 0 },
          { id: 'l2', accountId: 'SALES', debit: 0, credit: 900 },
          { id: 'l3', accountId: 'TAX_PAYABLE', debit: 0, credit: 100 }
        ]
      },
      {
        id: 'e2',
        date: new Date().toISOString(),
        description: 'Expense',
        lines: [
          { id: 'l4', accountId: 'EXP_RENT', debit: 200, credit: 0 },
          { id: 'l5', accountId: 'CASH', debit: 0, credit: 200 }
        ]
      }
    ];

    const accountMap = { AR: 'A/R', SALES: 'Sales', TAX_PAYABLE: 'Tax', EXP_RENT: 'Rent', CASH: 'Cash' };
    const trial = buildTrialBalance(entries, accountMap);
    // find sales row
    const salesRow = trial.find((r) => r.accountId === 'SALES');
    expect(salesRow).toBeDefined();
    expect(salesRow!.credit).toBe(900);
    const arRow = trial.find((r) => r.accountId === 'AR');
    expect(arRow!.debit).toBe(1000);
  });

  it('computes P&L correctly', () => {
    // trial rows emulate marginal results
    const trialRows = [
      { accountId: 'SALES', accountName: 'Sales', debit: 0, credit: 900, balance: -900 },
      { accountId: 'EXP_RENT', accountName: 'Rent', debit: 200, credit: 0, balance: 200 }
    ];
    const pl = buildPL(trialRows as any, ['SALES'], ['EXP_RENT']);
    expect(pl.revenue).toBeCloseTo(900 * -1 * -1 || 900, 0); // revenue calculation returns positive revenue
    // According to our buildPL implementation revenue = (credit - debit) * -1
    expect(pl.revenue).toBeCloseTo(900, 2);
    expect(pl.cogs).toBe(0);
    expect(pl.netIncome).toBeCloseTo(900 - 200, 2);
  });

  it('builds balance sheet numbers', () => {
    const trialRows = [
      { accountId: 'CASH', accountName: 'Cash', debit: 500, credit: 0, balance: 500 },
      { accountId: 'AR', accountName: 'A/R', debit: 1000, credit: 0, balance: 1000 },
      { accountId: 'AP', accountName: 'A/P', debit: 0, credit: 300, balance: -300 },
      { accountId: 'EQUITY', accountName: 'Equity', debit: 0, credit: 1200, balance: -1200 }
    ];
    const bs = buildBalanceSheet(trialRows as any, ['CASH', 'AR'], ['AP'], ['EQUITY']);
    expect(bs.assets).toBeCloseTo(1500, 2);
    expect(bs.liabilities).toBeCloseTo(300, 2);
    expect(bs.equity).toBeCloseTo(1200, 2);
  });

  it('computes basic cash flow (direct & indirect)', () => {
    const entries: JournalEntry[] = [
      {
        id: 'e1',
        date: new Date().toISOString(),
        lines: [
          { id: 'l1', accountId: 'CASH', debit: 0, credit: 200 }, // cash outflow
          { id: 'l2', accountId: 'EXP_RENT', debit: 200, credit: 0 }
        ]
      }
    ];
    const invoices: Invoice[] = [
      { id: 'i1', number: 'INV1', createdAt: new Date().toISOString(), date: new Date().toISOString(), currency: 'USD', items: [], subtotal: 500, tax: 0, discount: 0, total: 500, paidAmount: 300, status: 'paid' }
    ];
    const trialRows = [
      { accountId: 'SALES', accountName: 'Sales', debit: 0, credit: 500, balance: -500 },
      { accountId: 'EXP_RENT', accountName: 'Rent', debit: 200, credit: 0, balance: 200 }
    ];
    const cf = cashFlowFromData(entries, invoices as any, trialRows as any);
    expect(cf.direct.cashReceipts).toBeCloseTo(300, 2);
    expect(cf.direct.netCash).toBeCloseTo(300 - 200, 2);
    // indirect net should include net income
    expect(cf.indirect.netIncome).toBeDefined();
  });
});
