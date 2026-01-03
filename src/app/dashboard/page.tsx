import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Activity, PieChart } from 'lucide-react';
import PortfolioChartComponent from './components/portfolioChart/portfilio-chart';
import { DataTable } from './components/positionTable/data-table';
import { columns, Position } from './components/positionTable/columns';
import { getDashboardSummary, getPortfolioHistory, getPositions } from '@/services/TrackNestApi';
import { ChartTimeFrame } from '@/lib/trackNestTypes';

const stats = [
    { title: 'Portfolio Value', value: '$45,230.50', change: '+12.5%', icon: <DollarSign className="w-4 h-4" />, trend: 'up' },
    { title: 'Unrealized Gains', value: '$8,120.00', change: '+4.2%', icon: <TrendingUp className="w-4 h-4" />, trend: 'up' },
    { title: 'Total Gains', value: '$12,450.00', change: '-2.1%', icon: <Activity className="w-4 h-4" />, trend: 'down' },
    { title: 'Day Change', value: '$450.20', change: '+0.8%', icon: <PieChart className="w-4 h-4" />, trend: 'up' },
];

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className="text-muted-foreground">
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-card-foreground">
                                {stat.value}
                            </div>
                            <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <PortfolioChartComponent />

            <div className="p-1">
                <DataTable columns={columns} data={positions} />
            </div>
        </div>
    );
}