import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchInvoices, createInvoice, patchInvoiceStatus } from './invoices.slice';
import { useCallback } from 'react';

export const useInvoices = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => (s as any).invoices);
  return {
    ...state,
    fetch: useCallback((params?: any) => dispatch(fetchInvoices(params)), [dispatch]),
    create: useCallback((payload: any) => dispatch(createInvoice(payload)), [dispatch]),
    patchStatus: useCallback((id: string, status: string) => dispatch(patchInvoiceStatus({ id, status })), [dispatch])
  };
};
