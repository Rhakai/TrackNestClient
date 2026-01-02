"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

// Mock data reflecting the labels in your image (Jun 24 - Jun 30)
const data = [
  { date: "Jun 24", value: 4000 },
  { date: "Jun 25", value: 3000 },
  { date: "Jun 26", value: 5000 },
  { date: "Jun 27", value: 4500 },
  { date: "Jun 28", value: 6000 },
  { date: "Jun 29", value: 5500 },
  { date: "Jun 30", value: 7000 },
];

interface ChartProps {
  range: string;
}

export function Chart({ range }: ChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: "hsl(var(--popover))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
            itemStyle={{ color: "hsl(var(--popover-foreground))" }}
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