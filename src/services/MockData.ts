import { ChartTimeFrame, PortfolioHistory, ValuePoint, Account, Position } from "@/lib/trackNestTypes";

// --- 1. CONFIGURATION ---
// Increased volatility significantly:
// 0.08 = 8% daily swings (High)
// 0.15 = 15% daily swings (Extreme/Crypto)
const ACCOUNTS = [
  { name: "IBKR (Stocks)", startValue: 15000, volatility: 0.06 }, 
  { name: "Binance (Crypto)", startValue: 5000, volatility: 0.15 },
  { name: "Vanguard (ETF)", startValue: 25000, volatility: 0.02 }, 
];

// --- 2. GENERATOR HELPER ---
function generateCurve(
  count: number, 
  intervalHours: number, 
  baseValue: number, 
  volatility: number
): ValuePoint[] {
  const points: ValuePoint[] = [];
  let currentValue = baseValue;
  
  // Invested grows slightly over time to simulate monthly deposits
  let currentInvested = baseValue * 0.85; 

  const now = new Date();

  for (let i = 0; i < count; i++) {
    const pointDate = new Date(now.getTime() - (i * intervalHours * 60 * 60 * 1000));
    
    // 1. STANDARD FLUCTUATION (Random Walk)
    // Math.random() - 0.5 gives us a number between -0.5 and 0.5
    // We multiply by volatility * 4 to make the swings wider
    const percentChange = (Math.random() - 0.5) * volatility * 4;
    
    // 2. MARKET SHOCK (Occasional big jumps/drops)
    // 10% chance to have a "Trend Day" where movement is doubled
    const shockFactor = Math.random() > 0.9 ? 2.5 : 1; 

    currentValue = currentValue * (1 + percentChange * shockFactor);

    // Prevent negative values (bankruptcy protection!)
    if (currentValue < 0) currentValue = 100;

    // Invested logic: moves slowly
    if (i % 5 === 0) currentInvested = currentInvested * 0.998;

    points.unshift({
      date: pointDate.toISOString(),
      value: Number(currentValue.toFixed(2)),
      invested: Number(currentInvested.toFixed(2)),
    });
  }
  return points;
}

// --- 3. AGGREGATOR ---
function aggregateAccounts(accounts: Account[]): ValuePoint[] {
  const referenceAccount = accounts[0];
  if (!referenceAccount) return [];

  return referenceAccount.valuePoints.map((refPoint, index) => {
    let totalValue = 0;
    let totalInvested = 0;

    accounts.forEach(acc => {
      const point = acc.valuePoints[index];
      // Safety check in case arrays differ slightly in length
      if (point) {
        totalValue += point.value;
        totalInvested += point.invested;
      }
    });

    return {
      date: refPoint.date,
      value: totalValue,
      invested: totalInvested
    };
  });
}

// --- 4. BUILDERS ---
function getHistoryForTimeframe(timeFrame: ChartTimeFrame): PortfolioHistory {
  let pointsCount = 0;
  let intervalHours = 0;

  switch (timeFrame) {
    case ChartTimeFrame.day:
      // More granular for "Day" view to see the jitter
      pointsCount = 48; // Every 30 mins
      intervalHours = 0.5;
      break;
    case ChartTimeFrame.week:
      pointsCount = 21; // 3 points per day
      intervalHours = 8;
      break;
    case ChartTimeFrame.month:
      pointsCount = 30; // 1 point per day
      intervalHours = 24;
      break;
    case ChartTimeFrame.ytd:
      pointsCount = 50; 
      intervalHours = 24 * 3; // Every 3 days
      break;
    case ChartTimeFrame.year:
      pointsCount = 52; 
      intervalHours = 24 * 7;
      break;
    case ChartTimeFrame.max:
      pointsCount = 60; 
      intervalHours = 24 * 30;
      break;
  }

  const accounts: Account[] = ACCOUNTS.map(acc => ({
    name: acc.name,
    valuePoints: generateCurve(pointsCount, intervalHours, acc.startValue, acc.volatility)
  }));

  const combined = aggregateAccounts(accounts);

  return { accounts, combined };
}

// --- 5. EXPORT ---
export const MOCK_PORTFOLIOS: Record<ChartTimeFrame, PortfolioHistory> = {
  [ChartTimeFrame.day]: getHistoryForTimeframe(ChartTimeFrame.day),
  [ChartTimeFrame.week]: getHistoryForTimeframe(ChartTimeFrame.week),
  [ChartTimeFrame.month]: getHistoryForTimeframe(ChartTimeFrame.month),
  [ChartTimeFrame.ytd]: getHistoryForTimeframe(ChartTimeFrame.ytd),
  [ChartTimeFrame.year]: getHistoryForTimeframe(ChartTimeFrame.year),
  [ChartTimeFrame.max]: getHistoryForTimeframe(ChartTimeFrame.max),
};

// --- 6. MOCK POSITIONS ---
export const MOCK_POSITIONS: Position[] = [
  { 
    accountName: 'IBKR (Stocks)', 
    assetType: 'Stock', 
    assetCategory: 'Equity', 
    assetTicket: 'AAPL', 
    price: 185.20, 
    marketValue: 1852.00, 
    averageCost: 150.00, 
    cost: 1500.00, 
    amountOfAssets: 10, 
    unrealisedProfit: 352.00 
  },
  { 
    accountName: 'IBKR (Stocks)', 
    assetType: 'Stock', 
    assetCategory: 'Equity', 
    assetTicket: 'TSLA', 
    price: 175.50, 
    marketValue: 877.50, 
    averageCost: 240.00, 
    cost: 1200.00, 
    amountOfAssets: 5, 
    unrealisedProfit: -322.50 
  },
  { 
    accountName: 'Binance (Crypto)', 
    assetType: 'Crypto', 
    assetCategory: 'Cryptocurrency', 
    assetTicket: 'BTC', 
    price: 64200, 
    marketValue: 32100, 
    averageCost: 32000, 
    cost: 16000, 
    amountOfAssets: 0.5, 
    unrealisedProfit: 16100 
  },
];