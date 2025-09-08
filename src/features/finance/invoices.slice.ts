// src/features/finance/invoices.slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Invoice } from '../../types/finance';
import api from '../../services/api';
import { mock } from '../../services/mock.adapter';
import { v4 as uuid } from 'uuid';
import { addEntry as addLedgerEntry } from './ledger.slice';
import type { JournalEntry } from '../../types/finance';

/**
 * fetchInvoices / createInvoice / patchStatus are preserved.
 * New: postInvoiceToLedger: create a journal entry from invoice and push it to ledger.
 */

export const fetchInvoices = createAsyncThunk('invoices/fetch', async (params: any = {}) => {
  try {
    const res = await api.get('/finance/invoices', { params });
    return res.data;
  } catch (e) {
    // fallback to mock, apply filter/pagination
    const page = params.page || 1; const size = params.size || 10; const status = params.status;
    let items = mock.invoices.slice();
    if (status) items = items.filter((i) => i.status === status);
    const paged = items.slice((page - 1) * size, page * size);
    return { items: paged, total: items.length };
  }
});

export const createInvoice = createAsyncThunk('invoices/create', async (payload: Partial<Invoice>) => {
  try {
    const res = await api.post('/finance/invoices', payload);
    return res.data;
  } catch (e) {
    mock.invoices.unshift(payload as Invoice);
    return payload as Invoice;
  }
});

export const patchInvoiceStatus = createAsyncThunk('invoices/patchStatus', async ({ id, status }: { id: string; status: any }) => {
  try {
    const res = await api.patch(`/finance/invoices/${id}/status`, { status });
    return res.data;
  } catch (e) {
    const inv = mock.invoices.find((x) => x.id === id);
    if (inv) inv.status = status;
    return inv;
  }
});

/**
 * Post invoice to ledger:
 * - Debit Accounts Receivable (AR) for invoice.total
 * - Credit Sales (SALES) for subtotal
 * - Credit Tax Payable (TAX_PAYABLE) for tax (if > 0)
 *
 * The thunk will dispatch ledger.addEntry with the constructed journal entry.
 */
export const postInvoiceToLedger = createAsyncThunk(
  'invoices/postToLedger',
  async (invoiceId: string, { getState, dispatch }) => {
    // find invoice from store first, fallback to mock
    const state: any = getState();
    const invoices: Invoice[] = state.invoices?.items || mock.invoices || [];
    const invoice: Invoice | undefined = invoices.find((i) => i.id === invoiceId) || mock.invoices.find((i) => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    const entryId = uuid();
    const date = invoice.date || new Date().toISOString();
    // Build lines. Ensure lines sum debit == sum credit
    // Debit: AR (asset) = total
    const lines: JournalEntry['lines'] = [];
    const total = Number(invoice.total || 0);
    const subtotal = Number(invoice.subtotal || 0);
    const tax = Number(invoice.tax || 0);

    // Debit Accounts Receivable
    lines.push({
      id: `${entryId}-l-ar`,
      accountId: 'AR',
      description: `Invoice ${invoice.number} AR`,
      debit: Number(total.toFixed(2)),
      credit: 0
    });

    // Credit Sales Revenue
    if (subtotal > 0) {
      lines.push({
        id: `${entryId}-l-sales`,
        accountId: 'SALES',
        description: `Invoice ${invoice.number} Revenue`,
        debit: 0,
        credit: Number(subtotal.toFixed(2))
      });
    }

    // Credit Tax Payable
    if (tax > 0) {
      lines.push({
        id: `${entryId}-l-tax`,
        accountId: 'TAX_PAYABLE',
        description: `Invoice ${invoice.number} Tax`,
        debit: 0,
        credit: Number(tax.toFixed(2))
      });
    }

    // If rounding differences cause imbalance, add adjustment to rounding account
    const debitSum = lines.reduce((s, l) => s + (l.debit || 0), 0);
    const creditSum = lines.reduce((s, l) => s + (l.credit || 0), 0);
    const diff = Number((debitSum - creditSum).toFixed(2));
    if (Math.abs(diff) > 0.001) {
      // if diff > 0 means debits > credits, add credit to rounding
      if (diff > 0) {
        lines.push({
          id: `${entryId}-l-round`,
          accountId: 'ROUNDING',
          description: 'Rounding adjustment',
          debit: 0,
          credit: Number(diff.toFixed(2))
        });
      } else {
        lines.push({
          id: `${entryId}-l-round`,
          accountId: 'ROUNDING',
          description: 'Rounding adjustment',
          debit: Number(Math.abs(diff).toFixed(2)),
          credit: 0
        });
      }
    }

    const journalEntry: JournalEntry = {
      id: entryId,
      date,
      description: `Post invoice ${invoice.number}`,
      lines,
      createdAt: new Date().toISOString()
    };

    // Dispatch to ledger
    dispatch(addLedgerEntry(journalEntry));

    // Optionally, mark invoice as posted (we will not change status here to preserve business rules)
    // Return the created journal entry for consumers
    return journalEntry;
  }
);

interface InvoicesState { items: Invoice[]; total: number; loading: boolean; error?: string|null }
const initialState: InvoicesState = { items: [], total: 0, loading: false, error: null };

const slice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchInvoices.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(fetchInvoices.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.items; s.total = a.payload.total; });
    b.addCase(fetchInvoices.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Failed'; });

    b.addCase(createInvoice.fulfilled, (s, a) => { s.items.unshift(a.payload as Invoice); s.total += 1; });
    b.addCase(patchInvoiceStatus.fulfilled, (s, a) => {
      const idx = s.items.findIndex((x) => x.id === (a.payload as any).id);
      if (idx >= 0) s.items[idx] = { ...(s.items[idx]), ...(a.payload as any) };
    });

    b.addCase(postInvoiceToLedger.fulfilled, (s, a) => {
      // mark the invoice as posted? we won't change posted flag by default
      // maybe store lastPostedEntryId on invoice object
      const entry = a.payload as any;
      const invNumber = entry.description?.replace('Post invoice ', '') || null;
      if (!invNumber) return;
      // find invoice and attach lastPostedAt if any
      const inv = s.items.find((x) => x.number === invNumber);
      if (inv) {
        (inv as any).lastPostedAt = new Date().toISOString();
      }
    });
  }
});

export default slice.reducer;
