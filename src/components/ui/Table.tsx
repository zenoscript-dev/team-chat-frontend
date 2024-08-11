import { ReactNode, TableHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

type Column = {
  Header: string;
  accessor: string;
  Cell?: (value: any) => ReactNode;
};

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  columns: Column[];
  data: Record<string, any>[];
  variant?: 'primary' | 'secondary';
};

export default function Table({ columns, data, variant, ...rest }: TableProps) {
  return (
    <div className='overflow-x-auto'>
      <table
        {...rest}
        className={cn(tableVariants({ variant }), rest.className)}
      >
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border'
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className='whitespace-nowrap px-6 py-4 text-sm border'
                >
                  {column.Cell ? column.Cell(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableVariants = cva('min-w-full divide-y', {
  variants: {
    variant: {
      primary: 'bg-white divide-gray-200 border',
      secondary: 'bg-gray-50 divide-gray-300',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});