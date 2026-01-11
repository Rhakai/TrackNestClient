import PortfolioChartComponent from './components/portfolioChart/portfilio-chart';
import { DataTable } from './components/positionTable/data-table';
import { columns } from './components/positionTable/columns';
import { MOCK_POSITIONS } from '@/services/MockData';
import Kpis from './components/kpi/kpis';

export default async function DashboardPage() {

    // const [trackNestPositions, dashboardSummay] = await Promise.all([
    //     getPositions(),
    //     getDashboardSummary()
    // ]);

    return (
        <div className="p-8 bg-background text-foreground min-h-screen space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Investment Portfolio
            </h1>

            <Kpis />

            <PortfolioChartComponent />

            <div className="p-1">
                <DataTable columns={columns} data={MOCK_POSITIONS} />
            </div>
        </div>
    );
}

