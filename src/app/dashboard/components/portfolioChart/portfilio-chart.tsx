'use client'

import { Chart } from './chart';
import { Card, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartCache, ChartTimeFrame, PortfolioHistory } from '@/lib/trackNestTypes';
import { useEffect, useState } from 'react';
import { getPortfolioHistory } from '@/services/TrackNestApi';
import { Spinner } from '@/components/spinner';

export default function PortfolioChartComponent() {

    const [timeRange, setTimeRange] = useState<ChartTimeFrame>(ChartTimeFrame.week);

    const [cache, setCache] = useState<ChartCache>({});

    const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory>({ accounts: [] });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const subtitleMap: Record<ChartTimeFrame, string> = {
        [ChartTimeFrame.day]: 'Evolution for Today',
        [ChartTimeFrame.week]: 'Evolution for this Week',
        [ChartTimeFrame.month]: 'Evolution for this Month',
        [ChartTimeFrame.ytd]: 'Evolution for this Year',
        [ChartTimeFrame.year]: 'Evolution for One Year',
        [ChartTimeFrame.max]: 'Evolution Since Beginning',
    };

    useEffect(() => {
        // 1. Create a flag to track THIS specific request
        let isActive = true;

        const setSuccess = (portfolio: PortfolioHistory) => {
            if (!isActive) return;
            setIsError(false);
            setIsLoading(false);
            setPortfolioHistory(portfolio);
        };

        const resetFlags = () => {
            setIsError(false);
            setIsLoading(true);
        };

        const setError = () => {
            if (!isActive) return;
            setIsError(true);
            setIsLoading(false);
        };

        const loadData = async () => {
            const cachedResult = cache[timeRange];
            if (cachedResult) {
                setSuccess(cachedResult);
                return;
            }

            resetFlags();

            const data = await getPortfolioHistory(timeRange);

            if (!isActive)
                return;

            if (data === null) {
                setError();
                console.error("Failed to load chart data");
                return;
            }

            
            setCache(prev => ({ ...prev, [timeRange]: data }));
            setSuccess(data);
        };

        loadData();

        // CLEANUP: If user changes tab, mark this request as "dead"
        return () => {
            isActive = false;
        };

    }, [timeRange, cache]);

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

            {isLoading ? (
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Spinner size={50} />
                </div>
            ) : isError ? (
                <div className="h-[350px] w-full flex items-center justify-center text-destructive font-medium border border-dashed border-destructive/50 rounded-md bg-destructive/5">
                    Problems on Loading Chart
                </div>
            ) : (
                <Chart range={timeRange} portfolioHistory={portfolioHistory} />
            )}
        </Card>
    )
}