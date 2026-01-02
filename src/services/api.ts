import { ChartDataPoint, ChartTimeFrame, DashboardSummary, Position } from '@/lib/trackNestTypes';


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
    return []; // Return empty array on error so the app doesn't crash
  }
}

/**
 * Fetches the historical data for the Area Chart
 * @param range - 'day', 'week', 'month', 'ytd', '1y', 'max'
 */
export async function getChartData(range: ChartTimeFrame): Promise<ChartDataPoint[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/history?range=${range}`);
    if (!response.ok) throw new Error('Failed to fetch chart data');
    return await response.json();
  } catch (error) {
    console.error(error);
    // Return mock data fallback if API fails (optional, good for testing)
    return []; 
  }
}

/**
 * Fetches the top-level numbers for the KPI Cards
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { totalValue: '$0.00', totalGain: '0.00', gainPercentage: '0%' };
  }
}