export type PortfolioDetails = {
    totalInvested: number;
    totalValue: number;
    nominalGainLoss: number;
    percentageGainLoss: number;
}

export type Position = {
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

export type ChartTimeFrame = '1D' | '1W' | 'MTD' | '1M' | 'YTD' | '1Y' | 'Max';