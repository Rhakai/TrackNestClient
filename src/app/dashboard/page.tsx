import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Activity, PieChart } from "lucide-react";
import PortfolioChartComponent from "./portfilio-chart.component";
import { DataTable } from "./data-table";
import { columns, Position } from "./columns";

// Mock Data for the Portfolio
const stats = [
    { title: "Portfolio Value", value: "$45,230.50", change: "+12.5%", icon: <DollarSign className="w-4 h-4" />, trend: "up" },
    { title: "Unrealized Gains", value: "$8,120.00", change: "+4.2%", icon: <TrendingUp className="w-4 h-4" />, trend: "up" },
    { title: "Total Gains", value: "$12,450.00", change: "-2.1%", icon: <Activity className="w-4 h-4" />, trend: "down" },
    { title: "Day Change", value: "$450.20", change: "+0.8%", icon: <PieChart className="w-4 h-4" />, trend: "up" },
];

const positions: Position[] = [
    { ticker: "AAPL", shares: 10, avgPrice: "$150.00", currentPrice: "$185.20", gain: "+23.4%", status: "Profit" },
    { ticker: "TSLA", shares: 5, avgPrice: "$240.00", currentPrice: "$175.50", gain: "-26.8%", status: "Loss" },
    { ticker: "BTC", shares: 0.5, avgPrice: "$32,000", currentPrice: "$64,200", gain: "+100.6%", status: "Profit" },
    // ... add more items to test pagination
];

export default function DashboardPage() {
    return (
        // OPTIMIZED: bg-background sets the #09090b color, text-foreground sets the white text
        <div className="p-8 bg-background text-foreground min-h-screen space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Investment Portfolio
            </h1>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    // OPTIMIZED: 
                    // 1. Removed 'border-zinc-800'. 'border' now automatically uses your --border variable.
                    // 2. 'bg-card' uses your --card variable.
                    <Card key={index} className="bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            {/* OPTIMIZED: Added 'text-muted-foreground' for that subtle gray label look */}
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            {/* OPTIMIZED: Icons should also be muted to not distract from the value */}
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

            {/* Portfolio Value Chart */}
            {/* Ensure this component internally uses 'bg-card' and 'border' if it has a container */}
            <PortfolioChartComponent />

            {/* Positions Table */}
            <div className="p-1">
                <DataTable columns={columns} data={positions} />
            </div>
        </div>
    );
}