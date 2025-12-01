import { Suspense } from 'react';

import AllocationPieChart from './components/AllocationPieChart';
import PortfolioSummary from './components/PortfolioDetails';
import PortfolioChart from './components/PortfolioChart';
import PositionsTable from './components/PositionsTable';

import { TrackNestApi } from '@/lib/services/TrackNestApi';

export default async function Page() {

  const [positions, summary, portfolioHistory] = await Promise.all([
    TrackNestApi.getPositions(),
    TrackNestApi.getSummary(),
    TrackNestApi.getPortfolioHistory('1D'),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Suspense fallback={<p>Carregando Gráfico...</p>}>
            <div className="lg:col-span-2 h-80 lg:h-96">
                <PortfolioChart portfolioHistory={portfolioHistory} />
            </div>
        </Suspense>

        <div className="lg:col-span-1 h-80 lg:h-96">
          <AllocationPieChart positions={positions} />
        </div>

        <div className="lg:col-span-2 h-96 lg:h-[500px]">
          <PositionsTable positions={positions}/>
        </div>

        <div className="lg:col-span-1 h-96 lg:h-[500px]">
          <PortfolioSummary summary={summary} />
        </div>

      </div>
    </div>
  );
}