import api from '../../services/api';
import type { Invoice } from '../../types/finance';

// NOTE: in dev, backend may not exist — callers can use services/mock.adapter.ts instead.
// This service assumes backend endpoints exist at /finance/invoices
export const invoicesApi = {
  async list(params?: any): Promise<{ items: Invoice[]; total: number }> {
    const res = await api.get('/finance/invoices', { params });
    return res.data;
  },
  async create(payload: Partial<Invoice>) {
    const res = await api.post('/finance/invoices', payload);
    return res.data;
  },
  async update(id: string, payload: Partial<Invoice>) {
    const res = await api.patch(`/finance/invoices/${id}`, payload);
    return res.data;
  },
  async patchStatus(id: string, status: string) {
    const res = await api.patch(`/finance/invoices/${id}/status`, { status });
    return res.data;
  },
  async getById(id: string) {
    const res = await api.get(`/finance/invoices/${id}`);
    return res.data;
  }
};
