import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChartTimeFrame } from './trackNestTypes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);

export const formatCompactCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    notation: "compact",      // <--- This does the magic (k, M, B)
    maximumFractionDigits: 1  // Keeps it short ($1.5k instead of $1.52k)
  }).format(value);


// X-AXIS FORMATTER: Short and concise
export function formatXAxisDate(dateStr: string, range: ChartTimeFrame): string {
  const date = new Date(dateStr);

  switch (range) {
    case ChartTimeFrame.max:
    case ChartTimeFrame.year:
    case ChartTimeFrame.ytd:
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    case ChartTimeFrame.day:
      return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

    case ChartTimeFrame.month:
    case ChartTimeFrame.week:
    default:
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  }
}

export function formatTooltipDate(dateStr: string, range: ChartTimeFrame): string {
  const date = new Date(dateStr);

  if (range === ChartTimeFrame.day)
    return date.toLocaleDateString('pt-PT', { hour: 'numeric', minute: 'numeric' });

  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

}