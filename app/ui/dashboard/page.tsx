// app/ui/dashboard/page.tsx
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <main className={`${lusitana.className} p-6`}>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <section className="mb-6">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </section>

      <section className="mb-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices fetchData={fetchLatestInvoices} />
        </Suspense>
      </section>
    </main>
  );
}
