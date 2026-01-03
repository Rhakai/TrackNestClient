'use client';

import { ChartTimeFrame, ValuePoint } from '@/lib/trackNestTypes';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { CustomTooltip } from './custom-tooltip';
import { formatCompactCurrency, formatXAxisDate } from '@/lib/utils';

interface ChartProps {
  valuePoints: ValuePoint[];
  range: ChartTimeFrame; // <--- 1. Add this prop
}

export function Chart({ valuePoints, range }: ChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={valuePoints} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
            
            // 2. THIS IS THE MAGIC PROPERTY
            // It forces Recharts to skip labels if they are closer than 30px
            minTickGap={30} 

            // 3. Use the conditional formatter based on range
            tickFormatter={(value) => formatXAxisDate(value, range)}
          />

          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCompactCurrency}
            width={45}
          />
          
          <Tooltip 
            content={(props) => <CustomTooltip {...props as any} range={range} />} 
            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}