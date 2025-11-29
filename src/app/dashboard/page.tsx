import { Suspense } from 'react';

import { PortfolioDetails } from './components/PortfolioDetails';
import { AllocationPieChart } from './components/AllocationPieChart';
import PositionsTable from './components/PositionsTable';
import PortfolioChart from './components/PortfolioChart';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      {/* Container Principal com Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Suspense fallback={<p>Carregando Gráfico...</p>}>
            <div className="lg:col-span-2 h-80 lg:h-96">
                <PortfolioChart />
            </div>
        </Suspense>

        <div className="lg:col-span-1 h-80 lg:h-96">
          <AllocationPieChart />
        </div>

        <div className="lg:col-span-2 h-96 lg:h-[500px]">
          <PositionsTable />
        </div>

        <div className="lg:col-span-1 h-96 lg:h-[500px]">
          <PortfolioDetails />
        </div>

      </div>
    </div>
  );
}