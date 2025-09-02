// helper accounting calculations
import { JournalEntry, TrialBalanceRow, PLStatement } from '../types/finance';

export function sumLinesDebit(entry: JournalEntry) {
  return entry.lines.reduce((s, l) => s + (l.debit || 0), 0);
}
export function sumLinesCredit(entry: JournalEntry) {
  return entry.lines.reduce((s, l) => s + (l.credit || 0), 0);
}

/**
 * Build trial balance by aggregating entries into account totals.
 * @param entries journal entries
 * @param accounts map accountId -> name
 */
export function buildTrialBalance(entries: JournalEntry[], accounts: Record<string, string>): TrialBalanceRow[] {
  const map: Record<string, { debit: number; credit: number }> = {};
  for (const e of entries) {
    for (const l of e.lines) {
      map[l.accountId] = map[l.accountId] || { debit: 0, credit: 0 };
      map[l.accountId].debit += l.debit || 0;
      map[l.accountId].credit += l.credit || 0;
    }
  }
  return Object.keys(map).map((accId) => ({
    accountId: accId,
    accountName: accounts[accId] || accId,
    debit: map[accId].debit,
    credit: map[accId].credit,
    balance: map[accId].debit - map[accId].credit
  }));
}

/**
 * Profit & Loss builder (simple)
 * - revenue accounts are credit balances
 * - expense accounts are debit balances
 * @param trialBalance rows with account info and balances
 * @param revenueAccountIds ids considered revenue
 * @param expenseAccountIds ids considered expenses
 */
export function buildPL(trialBalance: TrialBalanceRow[], revenueAccountIds: string[], expenseAccountIds: string[]): PLStatement {
  const revenue = trialBalance
    .filter((r) => revenueAccountIds.includes(r.accountId))
    .reduce((s, r) => s + (r.credit - r.debit), 0) * -1 /* revenue credit positive */;

  const expenses = trialBalance
    .filter((r) => expenseAccountIds.includes(r.accountId))
    .reduce((s, r) => s + (r.debit - r.credit), 0);

  const grossProfit = revenue - expenses;
  const operatingExpenses = 0;
  const operatingIncome = grossProfit - operatingExpenses;
  const taxes = 0;
  const netIncome = operatingIncome - taxes;

  return { revenue, cogs: 0, grossProfit, operatingExpenses, operatingIncome, taxes, netIncome };
}

/**
 * Build balance sheet numbers (simple)
 * @param trialBalance
 * @param assetIds
 * @param liabilityIds
 * @param equityIds
 */
export function buildBalanceSheet(trialBalance: TrialBalanceRow[], assetIds: string[], liabilityIds: string[], equityIds: string[]) {
  const assets = trialBalance.filter((r) => assetIds.includes(r.accountId)).reduce((s, r) => s + (r.debit - r.credit), 0);
  const liabilities = trialBalance.filter((r) => liabilityIds.includes(r.accountId)).reduce((s, r) => s + (r.credit - r.debit), 0);
  const equity = trialBalance.filter((r) => equityIds.includes(r.accountId)).reduce((s, r) => s + (r.credit - r.debit), 0);
  return { assets, liabilities, equity };
}
