// app/ui/invoices/buttons.tsx
'use client';

import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const baseStyles =
    'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

  const variants: Record<typeof variant, string> = {
    primary:
      'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-400 active:bg-gray-400',
    danger:
      'bg-red-500 text-white hover:bg-red-400 focus-visible:outline-red-500 active:bg-red-600',
  };

  return (
    <button
      type="button"
      {...rest}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}

export function CreateInvoice() {
  return <Button variant="primary">Create Invoice</Button>;
}
