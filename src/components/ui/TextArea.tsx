import React from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

const textareaVariants = cva(
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

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Textarea({ variant, ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      className={cn(textareaVariants({ variant }), rest.className)}
    />
  );
}
