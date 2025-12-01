'use client';

import { Position } from '@/lib/types/DashboardTypes';

// 1. Define the type for a single slice of the pie
export type ChartDataPoint = {
    name: string;
    value: number;
};

// 2. Define the Props interface (The "Contract")
// This tells TypeScript: "I expect a prop named 'data' which is an array of ChartDataPoint"
interface AllocationPieChartProps {
    positions: Pick<Position, "assetCategory" | "marketValue">[];
}

// 3. Componente Gráfico Pie (Superior Direito)
export default function AllocationPieChart( { positions }: AllocationPieChartProps ) {
    // Just for testing: Check if data arrived
    console.log("Data received in child:", positions);

    // If no data, show a message
    if (!positions) {
        return <div className="p-4 text-gray-400">No data available</div>;
    }

    const data = Object.entries(
        positions.reduce((acc, position) => {
          const category = position.assetCategory;
          acc[category] = (acc[category] || 0) + position.marketValue;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, value]) => ({ name, value }));

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
            <h2 className="text-sm font-bold text-gray-700 mb-2">Alocação</h2>
            <div className="flex-1 flex items-center justify-center">
               {/* Here you would pass 'data' to your real library (Recharts/Nivo).
                  For now, let's just list the categories to prove it works. 
               */}
               <ul className="text-xs w-full">
                 {data.map((item) => (
                    <li key={item.name} className="flex justify-between border-b py-1">
                        <span>{item.name}</span>
                        <span className="font-bold">€ {item.value.toLocaleString()}</span>
                    </li>
                 ))}
               </ul>
            </div>
        </div>
    );
}
