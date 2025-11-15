// app/ui/invoices/table.tsx
'use client';

import { useEffect, useState } from 'react';

type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
};

async function fetchFilteredInvoices(query: string, currentPage: number): Promise<Invoice[]> {
  const url = `/api/invoices?query=${encodeURIComponent(query)}&page=${currentPage}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return res.json();
}

export default function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchFilteredInvoices(query, currentPage)
      .then(setInvoices)
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">Customer</th>
          <th className="border border-gray-200 px-4 py-2">Amount</th>
          <th className="border border-gray-200 px-4 py-2">Status</th>
          <th className="border border-gray-200 px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td className="border border-gray-200 px-4 py-2">{invoice.customer}</td>
            <td className="border border-gray-200 px-4 py-2">${invoice.amount}</td>
            <td className="border border-gray-200 px-4 py-2">{invoice.status}</td>
            <td className="border border-gray-200 px-4 py-2">{invoice.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
