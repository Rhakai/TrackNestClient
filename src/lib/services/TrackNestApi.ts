import { Position, PortfolioDetails, PortfolioValue, ChartTimeFrame } from '@/lib/types/DashboardTypes';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.your-backend.com';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const defaultOptions: RequestInit = {
    cache: 'no-store',
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
    
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

export const TrackNestApi = {
  
  getPositions: async (): Promise<Position[]> => {
    return MockPositions as Position[];
    return fetchAPI<Position[]>('/portfolio/positions');
  },

  getSummary: async (): Promise<PortfolioDetails> => {
    return {} as PortfolioDetails;
    return fetchAPI<PortfolioDetails>('/portfolio/summary');
  },

  getPortfolioHistory: async (range: ChartTimeFrame = '1Y'): Promise<PortfolioValue[]> => {
    return MockPortfolioHistory;
    return fetchAPI<PortfolioValue[]>(`/portfolio/history?range=${range}`, {
      cache: undefined,
      next: { revalidate: 3600 } 
    });
  },

  registerMovement: async (MovementData: any): Promise<void> => {
    return fetchAPI<void>('/movements', {
      method: 'POST',
      body: JSON.stringify(MovementData),
    });
  }
};



const MockPositions = [
  { assetTicket: 'ASML', amountOfAssets: 10, cost: 100, marketValue: 1000, assetCategory: 'stock' },
  { assetTicket: 'NVDA', amountOfAssets: 10, cost: 111, marketValue: 1000, assetCategory: 'stock' },
  { assetTicket: 'HOOD', amountOfAssets: 10, cost: 999, marketValue: 1000, assetCategory: 'stock' }
];

const MockPortfolioHistory = [
  { date: '2025-11-12', value: 15000},
  { date: '2025-11-13', value: 16000},
  { date: '2025-11-14', value: 18500},
  { date: '2025-11-15', value: 17000}
] as PortfolioValue[];