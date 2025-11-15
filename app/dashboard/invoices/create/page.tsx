import Breadcrumbs from '@/app/ui/dashboard/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
function Form({ customers }: { customers: any[] }) {
  return (
    <form>
      {/* Simple placeholder form to select a customer */}
      <label>
        Customer
        <select name="customer">
          {customers.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}