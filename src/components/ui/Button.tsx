import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
};

export default function Button({
  className,
  variant,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      {icon}
      {props.children}
    </button>
  );
}

const buttonVariants = cva(
  'flex gap-2 justify-between items-center py-2 px-4 rounded-md font-normal text-base hover:opacity-90',
  {
    variants: {
      variant: {
        primary: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        secondary: 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);
