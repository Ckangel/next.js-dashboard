'use server';

import { signIn } from '../auth'; // Adjust path if needed
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { InvoiceForm, State } from './definitions';
import { revalidatePath } from 'next/cache';

export async function authenticate(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    });
    return { message: 'Success', errors: {} };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: 'Authentication failed',
        errors: { email: 'Invalid credentials' },
      };
    }
    throw error;
  }
}

const UpdateInvoiceSchema = z.object({
  customer_id: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
});

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validated = UpdateInvoiceSchema.safeParse({
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validated.success) {
    return {
      message: 'Validation failed',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { customer_id, amount, status } = validated.data;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customer_id}, amount = ${amount}, status = ${status}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database update failed', errors: {} };
  }
}
