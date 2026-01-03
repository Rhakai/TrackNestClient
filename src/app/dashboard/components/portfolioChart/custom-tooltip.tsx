'use client';

import { ChartTimeFrame, ValuePoint } from '@/lib/trackNestTypes';
import { formatCurrency, formatTooltipDate } from '@/lib/utils';
import { TooltipProps } from 'recharts';

// Add range to the props, but we need to cast the implicit props from Recharts
interface CustomTooltipProps extends TooltipProps<number, string> {
  range: ChartTimeFrame;
}

export const CustomTooltip = ({ active, payload, label, range }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    
    const dataPoint = payload[0].payload as ValuePoint;

    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-md">
        {/* Date Label - Uses the new formatter */}
        <p className="mb-2 text-sm font-medium text-popover-foreground">
            {formatTooltipDate(label, range)}
        </p>

        {/* Value Row */}
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Value:</span>
          <span className="font-bold text-foreground">
            {formatCurrency(dataPoint.value)}
          </span>
        </div>

        {/* Invested Row */}
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
          <span className="text-muted-foreground">Invested:</span>
          <span className="font-bold text-muted-foreground">
            {formatCurrency(dataPoint.invested)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};