'use client'

import { Chart } from './chart';
import { Card, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ChartCache, ChartTimeFrame, PortfolioHistory, ValuePoint } from '@/lib/trackNestTypes';
import { useEffect, useState, useMemo } from 'react';
import { getPortfolioHistory } from '@/services/TrackNestApi';
import { Spinner } from '@/components/spinner';
import SectionTitle from '@/components/section-title';

export default function PortfolioChartComponent() {

    const [timeRange, setTimeRange] = useState<ChartTimeFrame>(ChartTimeFrame.week);

    const [selectedAccount, setSelectedAccount] = useState<string>("all");

    const [cache, setCache] = useState<ChartCache>({});
    const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory>();
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

            if (!isActive) return;

            if (data === null) {
                setError();
                // console.error("Failed to load chart data");
                return;
            }

            setCache(prev => ({ ...prev, [timeRange]: data }));
            setSuccess(data);
        };

        loadData();

        return () => { isActive = false; };
    }, [timeRange, cache]);

    const activeChartData: ValuePoint[] = useMemo(() => {
        if (!portfolioHistory) return [];

        if (selectedAccount === "all") {
            return portfolioHistory.combined;
        }

        const account = portfolioHistory.accounts.find(acc => acc.name === selectedAccount);
        return account ? account.valuePoints : [];
    }, [selectedAccount, portfolioHistory]);

    return (
        <Card className="p-6 bg-card border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <SectionTitle title="Portfolio Performance" />

                        {/* The Account Selector */}
                        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                            <SelectTrigger className="h-8 w-[180px] bg-muted/50 border-none focus:ring-0">
                                <SelectValue placeholder="Select View" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="right" align="start" >
                                <SelectItem value="all">All</SelectItem>
                                {portfolioHistory?.accounts.map((acc) => (
                                    <SelectItem key={acc.name} value={acc.name}>
                                        {acc.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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

            {/* CHART AREA */}
            {isLoading ? (
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Spinner size={50} />
                </div>
            ) : isError || !portfolioHistory ? (
                <div className="h-[350px] w-full flex items-center justify-center text-destructive font-medium border border-dashed border-destructive/50 rounded-md bg-destructive/5">
                    Problems on Loading Chart
                </div>
            ) : (
                // Pass the FILTERED data (activeChartData) instead of the whole history
                <Chart valuePoints={activeChartData} range={timeRange} />
            )}
        </Card>
    )
}