'use client'

import { Chart } from './chart';
import { Card, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartTimeFrame } from '@/lib/trackNestTypes';
import { useState } from 'react';

export default function PortfolioChartComponent() {

    const [timeRange, setTimeRange] = useState<ChartTimeFrame>(ChartTimeFrame.week);

    const subtitleMap: Record<ChartTimeFrame, string> = {
        [ChartTimeFrame.day]: 'Evolution for Today',
        [ChartTimeFrame.week]: 'Evolution for this Week',
        [ChartTimeFrame.month]: 'Evolution for this Month',
        [ChartTimeFrame.ytd]: 'Evolution for this Year',
        [ChartTimeFrame.year]: 'Evolution for One Year',
        [ChartTimeFrame.max]: 'Evolution Since Beginning',
    };

    return (
        <Card className="p-6 bg-card border">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                        Total Visitors
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {subtitleMap[timeRange]}
                    </p>
                </div>
                <Tabs 
                    defaultValue={ChartTimeFrame.week} 
                    onValueChange={(value) => setTimeRange(value as ChartTimeFrame)}
                >
                    <TabsList className="bg-muted">
                        <TabsTrigger value={ChartTimeFrame.day}>Day</TabsTrigger>
                        <TabsTrigger value={ChartTimeFrame.week}>Week</TabsTrigger>
                        <TabsTrigger value={ChartTimeFrame.month}>Month</TabsTrigger>
                        <TabsTrigger value={ChartTimeFrame.ytd}>YTD</TabsTrigger>
                        <TabsTrigger value={ChartTimeFrame.year}>1Y</TabsTrigger>
                        <TabsTrigger value={ChartTimeFrame.max}>Max</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Chart range={timeRange} />
        </Card>
    )
}