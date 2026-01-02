export type Position = {
    ticker: string;
    shares: number;
    avgPrice: string;
    currentPrice: string;
    gain: string;
    status: 'Profit' | 'Loss';
};

export type ChartDataPoint = {
    date: string;
    value: number;
};

export type DashboardSummary = {
    totalValue: string;    // e.g., '$125,000'
    totalGain: string;     // e.g., '+$12,500'
    gainPercentage: string;// e.g., '+10.5%'
};

// True types

export type PortfolioDetails = {
    totalValue: number;
    totalInvested: number;
    nominalGainLoss: number;
    percentageGainLoss: number;
}

export type PositionV2 = {
    accountName: string;
    assetType: string;
    assetCategory: string;
    assetTicket: string;
    price: number;
    marketValue: number;
    cost: number;
    averageCost: number;
    amountOfAssets: number;
    unrealisedProfit: number;
}

export type PortfolioValue = {
    date: string;
    value: number;
}

export enum ChartTimeFrame {
    day = '1d',
    week = '1w',
    month = '1m',
    ytd = 'ytd',
    year = '1y',
    max = 'max'
}