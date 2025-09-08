// import React, { useEffect, useMemo, useState } from 'react';
// import { z } from 'zod';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useInvoices } from '../../features/finance/invoices.hooks';
// import DataTable from '../../components/ui/DataTable';
// import Button from '../../components/ui/Button';
// import Modal from '../../components/ui/Modal';
// import { exportCsv } from '../../utils/csv';
// import { money } from '../../utils/formatters';
// import { v4 as uuid } from 'uuid';
// import Pagination from '../../components/ui/Pagination';
// import EmptyState from '../../components/ui/EmptyState';
// import Input from '../../components/ui/Input';
// import Select from '../../components/ui/Select';
// import { toDateInput } from '../../utils/dates';
// import type { InvoiceItem } from '../../types/finance';

// const invoiceItemSchema = z.object({
//   sku: z.string().optional(),
//   description: z.string().optional(),
//   qty: z.coerce.number().min(0.001),
//   price: z.coerce.number().min(0),
//   taxRate: z.coerce.number().min(0).max(1).optional(),
//   discount: z.coerce.number().min(0).optional()
// });

// const invoiceSchema = z.object({
//   customerId: z.string().min(1),
//   customerName: z.string().optional(),
//   currency: z.string().min(1),
//   items: z.array(invoiceItemSchema).min(1),
//   dueDate: z.string().optional(),
//   date: z.string().optional()
// });
// type InvoiceForm = z.infer<typeof invoiceSchema>;

// export default function InvoicesPage() {
//   const { items, total, loading, fetch, create, patchStatus } = useInvoices();
//   const [open, setOpen] = useState(false);
//   const [filterStatus, setFilterStatus] = useState<string | undefined>();
//   const [page, setPage] = useState(1);
//   const [size] = useState(10);

//   useEffect(() => { fetch({ page, size, status: filterStatus }); }, [fetch, page, size, filterStatus]);

//   const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm<InvoiceForm>({
//     resolver: zodResolver(invoiceSchema),
//     defaultValues: { currency: 'USD', items: [{ description: '', qty: 1, price: 0, taxRate: 0.0, discount: 0 }] }
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: 'items' as const });
//   const watchItems = watch('items') || [];
//   const watchDate = watch('date') || toDateInput();

//   const subtotal = useMemo(() => watchItems.reduce((s, it) => s + (it.qty || 0) * (it.price || 0), 0), [watchItems]);
//   const tax = useMemo(() => watchItems.reduce((s, it) => s + ((it.taxRate || 0) * (it.qty || 0) * (it.price || 0)), 0), [watchItems]);
//   const discount = useMemo(() => watchItems.reduce((s, it) => s + (it.discount || 0), 0), [watchItems]);
//   const totalAmount = subtotal + tax - discount;

//   const onSubmit = async (data: InvoiceForm) => {
//     const payload = {
//       id: uuid(),
//       number: `INV-${Math.floor(Math.random() * 900000) + 100000}`,
//       date: data.date || new Date().toISOString(),
//       customerId: data.customerId,
//       customerName: data.customerName,
//       currency: data.currency,
//       items: data.items as InvoiceItem[],
//       subtotal: Number(subtotal.toFixed(2)),
//       tax: Number(tax.toFixed(2)),
//       discount: Number(discount.toFixed(2)),
//       total: Number(totalAmount.toFixed(2)),
//       paidAmount: 0,
//       status: 'draft',
//       createdAt: new Date().toISOString()
//     };
//     await create(payload as any);
//     setOpen(false); reset();
//   };

//   const aging = (inv: any) => {
//     // simple aging buckets: current, 1-30,31-60,61-90,90+
//     const today = new Date();
//     const due = inv.dueDate ? new Date(inv.dueDate) : new Date(inv.date);
//     const days = Math.ceil((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
//     if (days <= 0) return 'current';
//     if (days <= 30) return '1-30';
//     if (days <= 60) return '31-60';
//     if (days <= 90) return '61-90';
//     return '90+';
//   };

//   const columns = [
//     { id: 'number', label: 'Number', accessor: (r: any) => r.number },
//     { id: 'customer', label: 'Customer', accessor: (r: any) => r.customerName || r.customerId },
//     { id: 'date', label: 'Date', accessor: (r: any) => new Date(r.date).toLocaleDateString() },
//     { id: 'due', label: 'Due', accessor: (r: any) => (r.dueDate ? new Date(r.dueDate).toLocaleDateString() : '-') },
//     { id: 'status', label: 'Status', accessor: (r: any) => r.status },
//     { id: 'aging', label: 'Aging', accessor: (r: any) => aging(r) },
//     { id: 'total', label: 'Total', accessor: (r: any) => money(r.total, r.currency) },
//     { id: 'paid', label: 'Paid', accessor: (r: any) => money(r.paidAmount || 0, r.currency) },
//     {
//       id: 'actions',
//       label: 'Actions',
//       accessor: (r: any) => (
//         <div className="flex gap-2">
//           <button className="px-2 py-1 rounded bg-gray-700" onClick={() => patchStatus(r.id, r.status === 'draft' ? 'sent' : 'paid')}>{r.status === 'draft' ? 'Send' : 'Toggle Paid'}</button>
//         </div>
//       )
//     }
//   ];

//   const canCreate = true;

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Invoices</h1>
//         <div className="flex items-center gap-3">
//           <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value || undefined)} className="bg-gray-800 p-2 rounded" aria-label="Filter status">
//             <option value="">All</option><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="overdue">Overdue</option>
//           </select>
//           <Button onClick={() => exportCsv('invoices.csv', items.map((i: any) => ({ number: i.number, total: i.total, status: i.status })))}>Export CSV</Button>
//           {canCreate && (<Button onClick={() => setOpen(true)} variant="secondary">Create Invoice</Button>)}
//         </div>
//       </div>

//       <div className="bg-surface rounded-2xl p-4">
//         {loading ? (<div>Loading...</div>)
//           : items.length === 0 ? (<EmptyState title="No invoices" description="Create your first invoice to get started." />)
//             : (<DataTable columns={columns as any} data={items as any} />)}
//       </div>

//       <div className="mt-4 flex justify-between items-center">
//         <div className="text-sm text-gray-400">Total: {total}</div>
//         <Pagination page={page} onChange={setPage} />
//       </div>

//       <Modal open={open} onClose={() => setOpen(false)} title="Create Invoice">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm">Date</label>
//             <Input type="date" {...register('date')} defaultValue={toDateInput()} />
//           </div>
//           <div>
//             <label className="block text-sm">Customer ID</label>
//             <Input {...register('customerId')} />
//             {errors.customerId && <small className="text-red-400">{(errors.customerId as any)?.message}</small>}
//           </div>
//           <div>
//             <label className="block text-sm">Currency</label>
//             <Input {...register('currency')} />
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Items</h4>
//             <div className="space-y-2">
//               {fields.map((f, idx) => (
//                 <div key={f.id} className="grid grid-cols-12 gap-2 items-end">
//                   <div className="col-span-5">
//                     <label className="block text-xs">Description</label>
//                     <Input {...register(`items.${idx}.description` as const)} />
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-xs">Qty</label>
//                     <Input type="number" {...register(`items.${idx}.qty` as const)} />
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-xs">Price</label>
//                     <Input type="number" step="0.01" {...register(`items.${idx}.price` as const)} />
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-xs">TaxRate</label>
//                     <Input type="number" step="0.01" {...register(`items.${idx}.taxRate` as const)} />
//                   </div>
//                   <div className="col-span-1">
//                     <button type="button" onClick={() => remove(idx)} className="px-2 py-1 bg-red-700 rounded">Remove</button>
//                   </div>
//                 </div>
//               ))}
//               <div>
//                 <button type="button" onClick={() => append({ description: '', qty: 1, price: 0, taxRate: 0, discount: 0 })} className="px-3 py-1 bg-gray-700 rounded">Add item</button>
//               </div>
//             </div>
//           </div>

//           <div className="p-3 bg-gray-900 rounded">
//             <div className="flex justify-between"><div>Subtotal</div><div>{money(subtotal)}</div></div>
//             <div className="flex justify-between"><div>Tax</div><div>{money(tax)}</div></div>
//             <div className="flex justify-between"><div>Discount</div><div>{money(discount)}</div></div>
//             <div className="flex justify-between font-semibold mt-2"><div>Total</div><div>{money(totalAmount)}</div></div>
//           </div>

//           <div className="flex justify-end gap-2">
//             <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
//             <Button type="submit">Save</Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }
import React from 'react';
export default function Invoicespage() {
  return <div>invoicespage</div>;
}