'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { createInvoice } from '@/app/lib/actions';
 
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  required
/>

export default function Form({
  customers,
}: {
  customers: CustomerField[];
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
 
  return <form action={formAction}>...</form>;
}

{
  return (
    <form action={createInvoice}>
      {/* ... */}
    </form>
  )
}