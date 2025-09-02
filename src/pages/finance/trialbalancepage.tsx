// // src/features/finance/reports.service.ts
// import type { JournalEntry, Invoice } from '../../types/finance';
// import { buildTrialBalance, buildPL, buildBalanceSheet } from '../../utils/finance';
// import { mock } from '../../services/mock.adapter';




// /**
//  * Reports service contains helpers to build derived reports from ledger entries and invoices.
//  * These implementations are frontend-derived; server-side should be authoritative in production.
//  */

// export function trialFromEntries(entries: JournalEntry[], accountMap: Record<string, string>) {
//   return buildTrialBalance(entries, accountMap);
// }

// export function plFromTrial(trialRows: any[], revenueAccountIds: string[], expenseAccountIds: string[]) {
//   return buildPL(trialRows, revenueAccountIds, expenseAccountIds);
// }

// export function bsFromTrial(trialRows: any[], assetIds: string[], liabilityIds: string[], equityIds: string[]) {
//   return buildBalanceSheet(trialRows, assetIds, liabilityIds, equityIds);
// }

// /**
//  * Build a cash flow statement (simple) - both direct and indirect simplified.
//  * - direct: looks at AR cash receipts (paid invoices) and ledger lines with cash accounts
//  * - indirect: starts with net income (from PL) and adjusts for non-cash items (very simplified)
//  */
// export function cashFlowFromData(entries: JournalEntry[], invoices: Invoice[], trialRows: any[]) {
//   // cash account ids (in production come from chart of accounts)
//   const cashIds = ['CASH', 'BANK'];

//   // Direct method: cash receipts = payments received (paid invoices)
//   const cashReceipts = (invoices || []).reduce((s, inv) => s + ((inv.paidAmount || 0) > 0 ? Number(inv.paidAmount) : 0), 0);

//   // Cash payments: scan ledger entries for payments from cash accounts (debit credit logic)
//   let cashPayments = 0;
//   for (const e of entries) {
//     for (const l of e.lines) {
//       if (cashIds.includes(l.accountId)) {
//         // debit to cash = inflow, credit to cash = outflow (depends on entry)
//         cashPayments += l.credit || 0;
//       }
//     }
//   }

//   // Indirect method (approx): net income from trial rows using revenue/expense classification
//   // Use trialRows to estimate net income: revenue negative balance (credit > debit), expenses positive
//   const revenueIds = trialRows.filter((r: any) => r.accountName?.toLowerCase().includes('sales') || r.accountId === 'SALES').map((r: any) => r.accountId);
//   const expenseIds = trialRows.filter((r: any) => (r.accountName?.toLowerCase().includes('expense') || r.accountId.startsWith('EXP'))).map((r: any) => r.accountId);

//   // compute PL quickly
//   const pl = buildPL(trialRows, revenueIds, expenseIds);

//   // non-cash adjustments - very simplified: depreciation if present in trialRows under 'depreciation'
//   const nonCashAdj = trialRows.reduce((s: number, r: any) => {
//     if (r.accountName?.toLowerCase().includes('depreciation')) return s + Math.abs(r.debit - r.credit);
//     return s;
//   }, 0);

//   const indirectNet = pl.netIncome + nonCashAdj;

//   return {
//     direct: {
//       cashReceipts,
//       cashPayments,
//       netCash: cashReceipts - cashPayments
//     },
//     indirect: {
//       netIncome: pl.netIncome,
//       nonCashAdjustments: nonCashAdj,
//       netCash: indirectNet
//     }
//   };
// }
import React from 'react';
export default function Trialbalancepage() {
  return <div>InspectionsPage</div>;
}