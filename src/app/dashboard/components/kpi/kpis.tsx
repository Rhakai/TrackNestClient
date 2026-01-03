'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Activity, PieChart } from 'lucide-react';


const stats = [
    { title: 'Portfolio Value', value: '$45,230.50', change: '+12.5%', icon: <DollarSign className="w-4 h-4" />, trend: 'up' },
    { title: 'Unrealized Gains', value: '$8,120.00', change: '+4.2%', icon: <TrendingUp className="w-4 h-4" />, trend: 'up' },
    { title: 'Total Gains', value: '$12,450.00', change: '-2.1%', icon: <Activity className="w-4 h-4" />, trend: 'down' },
    { title: 'Day Change', value: '$450.20', change: '+0.8%', icon: <PieChart className="w-4 h-4" />, trend: 'up' },
];

export default function Kpis() {
    return (
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
    );
}