// service layer - in production this would call backend endpoints
import api from '../../services/api';
import type { JournalEntry } from '../../types/finance';
import { mock } from '../../services/mock.adapter';

/**
 * These methods try a real API and fall back to local mock data if API fails.
 */
export const ledgerApi = {
  async list(): Promise<JournalEntry[]> {
    try {
      const res = await api.get('/finance/ledger');
      return res.data;
    } catch (err) {
      // fallback to mock - convert invoices to journal entries (basic)
      return (mock.invoices || []).map((inv) => ({
        id: inv.id,
        date: inv.createdAt || inv.date || new Date().toISOString(),
        description: `Invoice ${inv.number}`,
        lines: [
          // debit Accounts Receivable (asset)
          { id: `${inv.id}-l1`, accountId: 'AR', debit: inv.total, credit: 0 },
          // credit Sales (revenue)
          { id: `${inv.id}-l2`, accountId: 'SALES', debit: 0, credit: inv.subtotal },
          // credit Tax payable
          { id: `${inv.id}-l3`, accountId: 'TAX_PAYABLE', debit: 0, credit: inv.tax }
        ]
      }));
    }
  }
};
