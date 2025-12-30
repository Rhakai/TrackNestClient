'use client'

import { PortfolioChart } from "@/components/portfolio-chart";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function PortfolioChartComponent() {

    const [timeRange, setTimeRange] = useState("week");
    const subtitleMap: Record<string, string> = {
        "day": "Evolution for Today",
        "week": "Evolution for this Week",
        "month": "Evolution for this Month",
        "ytd": "Evolution for this Year",
        "1y": "Evolution for One Year",
        "max": "Evolution Since Beginning",
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
                <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value)}>
                    <TabsList className="bg-muted">
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="ytd">YTD</TabsTrigger>
                        <TabsTrigger value="1y">1Y</TabsTrigger>
                        <TabsTrigger value="max">Max</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <PortfolioChart range={timeRange} />
        </Card>
    )
}