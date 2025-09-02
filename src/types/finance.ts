// src/types/finance.ts
export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
}

export interface JournalEntryLine {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO
  description: string;
  lines: JournalEntryLine[];
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  customer: string;
  items: { description: string; quantity: number; price: number }[];
  status: "draft" | "sent" | "paid" | "overdue";
  total: number;
}

export interface FinanceReport {
  incomeStatement: { revenue: number; expenses: number; netIncome: number };
  balanceSheet: {
    assets: number;
    liabilities: number;
    equity: number;
  };
  cashFlow: {
    inflows: number;
    outflows: number;
    netCash: number;
  };
}
