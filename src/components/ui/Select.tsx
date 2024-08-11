import React from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

type Option = {
  label: string;
  value: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  variant?: 'primary' | 'secondary';
};

export default function Select({ options, variant, ...rest }: SelectProps) {
  return (
    <select
      {...rest}
      className={cn(selectVariants({ variant }), rest.className)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const selectVariants = cva(
  'block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none sm:text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black border-gray-300',
        secondary: 'bg-gray-50 text-gray-700 border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);
