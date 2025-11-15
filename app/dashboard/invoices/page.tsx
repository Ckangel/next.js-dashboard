import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense, type FC } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
 
const PaginationComponent = Pagination as unknown as FC<{ totalPages: number }>;
 
const CreateInvoice = () => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
    >
      Create Invoice
    </button>
  );
};
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <PaginationComponent totalPages={totalPages} />
      </div>
      </Suspense>
    </div>
  );
}