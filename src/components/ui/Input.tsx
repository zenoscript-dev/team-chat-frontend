import React from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Input({ variant, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cn(inputVariants({ variant }), rest.className)}
    />
  );
}

const inputVariants = cva(
  'block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-white text-black border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
        secondary:
          'bg-gray-50 text-gray-700 border-gray-300 focus:ring-gray-500 focus:border-gray-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);
