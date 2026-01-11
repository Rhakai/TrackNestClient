'use client'

import { ColumnDef, CellContext } from '@tanstack/react-table'
import { Position } from '@/lib/trackNestTypes'
import { formatCurrency } from '@/lib/utils'

// Helper functions for common cell renderers
const currencyCell = (accessorKey: keyof Position) => ({
  cell: ({ row }: CellContext<Position, unknown>) => {
    return formatCurrency(row.getValue(accessorKey) as number)
  },
})

const numberCell = (
  accessorKey: keyof Position,
  options: Intl.NumberFormatOptions = { maximumFractionDigits: 4 }
) => ({
  cell: ({ row }: CellContext<Position, unknown>) => {
    const value = row.getValue(accessorKey) as number
    return value.toLocaleString('en-US', options)
  },
})

export const columns: ColumnDef<Position>[] = [
  // Data Columns
  {
    accessorKey: 'assetTicket',
    header: 'Ticker',
    cell: ({ row }) => <div className='font-medium text-foreground'>{row.getValue('assetTicket')}</div>,
  },
  {
    accessorKey: 'amountOfAssets',
    header: 'Number of Assets',
    ...numberCell('amountOfAssets', { maximumFractionDigits: 4 }),
  },
  {
    accessorKey: 'marketValue',
    header: 'Market Value',
    ...currencyCell('marketValue'),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    ...currencyCell('price'),
  },
  {
    accessorKey: 'cost',
    header: 'Invested Value',
    ...currencyCell('cost'),
  },
  {
    accessorKey: 'averageCost',
    header: 'Average Cost',
    ...currencyCell('averageCost'),
  },
  {
    accessorKey: 'unrealisedProfit',
    header: 'Profit/Loss',
    cell: ({ row }) => {
      const profit = row.getValue('unrealisedProfit') as number
      const cost = row.original.cost
      const percentage = cost !== 0 ? (profit / cost) * 100 : 0
      const isProfit = profit >= 0
      const sign = isProfit ? '+' : ''
      
      return (
        <div className='flex flex-col'>
          <span className={isProfit ? 'text-green-500' : 'text-red-500'}>
            {sign}{formatCurrency(profit)}
          </span>
          <span className={`text-xs ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
            {sign}{percentage.toFixed(2)}%
          </span>
        </div>
      )
    },
  },
]
