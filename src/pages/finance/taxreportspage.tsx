import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import DataTable from '../../components/ui/DataTable';
import { exportCsv } from '../../utils/csv';

/**
 * Builds a VAT/Tax summary from invoices:
 * - taxable base
 * - tax collected
 * - tax payable per period
 */
export default function TaxReportPage() {
  const invoices = useAppSelector((s: any) => s.invoices?.items || []);

  const rows = useMemo(() => {
    return invoices.map((inv: any) => ({
      id: inv.id,
      date: inv.date,
      number: inv.number,
      taxable: inv.subtotal,
      tax: inv.tax,
      total: inv.total,
      status: inv.status
    }));
  }, [invoices]);

  const columns = [
    { id: 'date', label: 'Date', accessor: (r: any) => new Date(r.date).toLocaleDateString() },
    { id: 'number', label: 'Invoice', accessor: (r: any) => r.number },
    { id: 'taxable', label: 'Taxable Base', accessor: (r: any) => r.tax.toFixed ? r.taxable.toFixed(2) : r.taxable },
    { id: 'tax', label: 'Tax', accessor: (r: any) => r.tax.toFixed(2) },
    { id: 'total', label: 'Total', accessor: (r: any) => r.total.toFixed(2) },
    { id: 'status', label: 'Status', accessor: (r: any) => r.status }
  ];

  const totalTax = rows.reduce((s: number, r: any) => s + (r.tax || 0), 0);
  const totalTaxable = rows.reduce((s: number, r: any) => s + (r.taxable || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tax / VAT Report</h2>
        <div className="flex gap-2">
          <button onClick={() => exportCsv('tax-report.csv', rows)} className="px-3 py-1 bg-gray-800 rounded">Export CSV</button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-2xl">
        <DataTable columns={columns as any} data={rows as any} />
        <div className="mt-4 flex justify-end gap-4">
          <div>Total Taxable: {totalTaxable.toFixed(2)}</div>
          <div>Total Tax Collected: {totalTax.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
