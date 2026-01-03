import { ChartTimeFrame, PortfolioDetails, PortfolioHistory, Position } from '@/lib/trackNestTypes';
import { MOCK_PORTFOLIOS } from './MockData';


// 2. CONFIGURATION
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 3. FETCH FUNCTIONS
export async function getPositions(): Promise<Position[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/positions`);
    if (!response.ok) throw new Error('Failed to fetch positions');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetches the historical data for the Area Chart
 * @param range - ChartTimeFrame
 */
export async function getPortfolioHistory(range: ChartTimeFrame): Promise<PortfolioHistory | null> {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PORTFOLIOS[range]);
    }, 800); // 800ms simulated network latency
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/history?range=${range}`);
    if (!response.ok) throw new Error('Failed to fetch chart data');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Fetches the top-level numbers for the KPI Cards
 */
export async function getDashboardSummary(): Promise<PortfolioDetails | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}