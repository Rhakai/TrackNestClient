import PortfolioChartComponent from './components/portfolioChart/portfilio-chart';
import Kpis from './components/kpi/kpis';
import Pagetitle from '@/components/page-title';
import PositionsTable from './components/positionTable/positions-Table';

export default async function DashboardPage() {

    // const [trackNestPositions, dashboardSummay] = await Promise.all([
    //     getPositions(),
    //     getDashboardSummary()
    // ]);

    return (
        <div className="p-8 bg-background text-foreground min-h-screen space-y-8">
            
            <Pagetitle title="Investment Portfolio" />

            <Kpis />

            <PortfolioChartComponent />

            <PositionsTable />

        </div>
    );
}

