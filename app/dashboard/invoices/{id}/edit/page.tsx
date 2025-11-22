// dashboard/invoices/[id]/edit/page.tsx

import { Metadata } from 'next';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  // Optional: extra guard if id can be missing
  if (!id) {
    notFound();
  }

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  
  if (!invoice) {
    notFound();
  }

  // ...render invoice editing UI here using invoice and customers
}
