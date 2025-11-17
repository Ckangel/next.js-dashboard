// ...
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { InvoiceForm } from '@/app/types'; // Adjust the import path as needed
 
export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = (state: State | undefined, formData: FormData) =>
    updateInvoice(invoice.id, state ?? initialState, formData);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);
 
  return <form action={formAction}>{/* ... */}</form>;
}