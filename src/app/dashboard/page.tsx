import PortfolioChartComponent from './components/portfolioChart/portfilio-chart';
import { DataTable } from './components/positionTable/data-table';
import { columns, Position } from './components/positionTable/columns';
import Kpis from './components/kpi/kpis';

const positions: Position[] = [
    { ticker: 'AAPL', shares: 10, avgPrice: '$150.00', currentPrice: '$185.20', gain: '+23.4%', status: 'Profit' },
    { ticker: 'TSLA', shares: 5, avgPrice: '$240.00', currentPrice: '$175.50', gain: '-26.8%', status: 'Loss' },
    { ticker: 'BTC', shares: 0.5, avgPrice: '$32,000', currentPrice: '$64,200', gain: '+100.6%', status: 'Profit' },
];

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

            {/* KPI Cards */}
            <Kpis />

            <PortfolioChartComponent />

            <div className="p-1">
                <DataTable columns={columns} data={positions} />
            </div>
        </div>
    );
}

