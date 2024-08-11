import React from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

const modalVariants = cva(' inset-0 flex items-center justify-center p-4', {
  variants: {
    variant: {
      primary: 'bg-white shadow-lg border border-gray-300',
      secondary: 'bg-gray-50 shadow-md border border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const overlayVariants = cva(' inset-0 bg-black opacity-50', {
  variants: {
    variant: {
      primary: 'bg-black opacity-50',
      secondary: 'bg-gray-700 opacity-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'primary' | 'secondary';
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  variant,
  children,
  ...rest
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={cn(overlayVariants({ variant }))} onClick={onClose} />
      <div {...rest} className={cn(modalVariants({ variant }), rest.className)}>
        {children}
      </div>
    </>
  );
};

export default Modal;
