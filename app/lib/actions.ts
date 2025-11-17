'use server';
 
// Update the path below to the correct location of your auth module, e.g.:
import { signIn } from '../auth';
// or, if it's in the root 'app' directory:
// import { signIn } from '../../auth';
import { AuthError } from 'next-auth';


import { sql } from '@vercel/postgres';

const UpdateInvoice = {
  safeParse(input: any) {
    const errors: Record<string, string[]> = {};
    const customerId = typeof input.customerId === 'string' ? input.customerId : String(input.customerId ?? '');
    const rawAmount = input.amount;
    const amount =
      typeof rawAmount === 'string' && rawAmount !== ''
        ? Number(rawAmount)
        : typeof rawAmount === 'number'
        ? rawAmount
        : NaN;
    const status = typeof input.status === 'string' ? input.status : String(input.status ?? '');
    if (!customerId) errors.customerId = ['CustomerId is required'];
    if (!Number.isFinite(amount)) errors.amount = ['Amount must be a number'];
    const allowed = ['draft', 'pending', 'paid'];
    if (!status || !allowed.includes(String(status).toLowerCase())) errors.status = ['Invalid status'];
    if (Object.keys(errors).length) {
      return {
        success: false,
        error: {
          flatten() {
            return { fieldErrors: errors };
          },
        },
      };
    }
    return { success: true, data: { customerId, amount, status } };
  },
};

export type State = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors ?? {},
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount = 0, status } = validatedFields.data ?? {};
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}