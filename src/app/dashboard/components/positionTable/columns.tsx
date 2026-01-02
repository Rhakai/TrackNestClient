'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

// This type matches your data
export type Position = {
  ticker: string
  shares: number
  avgPrice: string
  currentPrice: string
  gain: string
  status: 'Profit' | 'Loss'
}

export const columns: ColumnDef<Position>[] = [
  // 1. The 'Select' Column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        // The Checkbox component automatically uses your 'primary' and 'border' variables
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // 2. Data Columns
  {
    accessorKey: 'ticker',
    header: 'Ticker',
    // OPTIMIZED: Replaced 'text-white' with 'text-foreground' (Semantic)
    cell: ({ row }) => <div className='font-medium text-foreground'>{row.getValue('ticker')}</div>,
  },
  {
    accessorKey: 'shares',
    header: 'Shares',
  },
  {
    accessorKey: 'avgPrice',
    header: 'Avg. Price',
  },
  {
    accessorKey: 'currentPrice',
    header: 'Current Price',
  },
  {
    accessorKey: 'gain',
    header: 'Total Gain',
    cell: ({ row }) => {
      const gain = row.getValue('gain') as string
      // Standard financial colors (green/red) are usually kept as utility classes 
      // rather than semantic variables because they mean 'Good/Bad' regardless of theme.
      return (
        <span className={gain.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
          {gain}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') === 'Profit' ? 'default' : 'destructive'}>
        {row.getValue('status')}
      </Badge>
    ),
  },
]