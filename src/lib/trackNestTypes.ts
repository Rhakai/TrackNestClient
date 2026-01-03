export type PortfolioDetails = {
    totalValue: number;
    totalInvested: number;
    totalGain: number;
    totalGainPercentage: number;
}

export type Position = {
    accountName: string; // to be used in the pie chart
    assetType: string; // to be used in the pie chart
    assetCategory: string; // to be used in the pie chart
    assetTicket: string;
    price: number;
    marketValue: number;
    averageCost: number;
    cost: number;
    amountOfAssets: number;
    unrealisedProfit: number;
}

export type Account = {
    name: string; 
    accountValue : AccountValue;
}

export type AccountValue = {
    date: string;
    value: number;
    invested: number;
}

export type PortfolioHistory = {
    accounts: Account[]
}

export enum ChartTimeFrame {
    day = '1d',
    week = '1w',
    month = '1m',
    ytd = 'ytd',
    year = '1y',
    max = 'max'
}

export type ChartCache = Partial<Record<ChartTimeFrame, PortfolioHistory>>;