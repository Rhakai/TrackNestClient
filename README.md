# TrackNest Client

TrackNest is a web application for tracking and analyzing investment portfolios. The frontend is built with Next.js and communicates with a .NET backend API to display comprehensive portfolio information, including historical performance, position details, and account analytics.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.0
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts 2.15.4
- **Tables**: TanStack Table 8.21.3
- **Language**: TypeScript 5
- **Icons**: Lucide React

## Project Overview

TrackNest Client is the frontend application that displays investment portfolio data retrieved from a .NET backend API. The application provides users with:

- **Dashboard Overview**: Key performance indicators (KPIs) and portfolio metrics
- **Portfolio Performance**: Historical value visualization with customizable time frames
- **Position Details**: Comprehensive table of individual holdings across all accounts
- **Multi-Account Support**: Track stocks, ETFs, and cryptocurrency across multiple accounts

## Current Implementation Status

### ✅ Implemented Components

- **Dashboard Page** (`src/app/dashboard/page.tsx`): Main dashboard layout with KPI cards, portfolio chart, and position table
- **KPI Cards** (`src/app/dashboard/components/kpi/kpis.tsx`): Display portfolio metrics (currently using mock data)
- **Portfolio Chart** (`src/app/dashboard/components/portfolioChart/portfilio-chart.tsx`): Interactive area chart with time frame selector and account filtering
- **Position Table** (`src/app/dashboard/components/positionTable/data-table.tsx`): Sortable, filterable table with column visibility controls
- **API Service** (`src/services/TrackNestApi.ts`): Service layer for backend communication
- **Type Definitions** (`src/lib/trackNestTypes.ts`): TypeScript types for portfolio data
- **Mock Data** (`src/services/MockData.ts`): Temporary mock data for development

### 🚧 Pending Implementation (MVP)

- Backend API integration to replace mock data
- Real-time data fetching for dashboard components
- Error handling and loading states (partially implemented)

## MVP Goals

The primary objective for the MVP is to **connect the frontend to the .NET backend API** and retrieve real data to populate the dashboard components.

### Required API Endpoints

The following endpoints need to be implemented in the backend and consumed by the frontend:

1. **GET `/positions`** - Returns array of `Position` objects
   - Used by: Position table component
   - Returns: Individual holdings with details (ticker, shares, prices, P/L, etc.)

2. **GET `/portfolio/history?range={timeFrame}`** - Returns `PortfolioHistory` object
   - Used by: Portfolio chart component
   - Parameters: `timeFrame` (one of: `1d`, `1w`, `1m`, `ytd`, `1y`, `max`)
   - Returns: Historical value points for combined portfolio and individual accounts

3. **GET `/summary`** - Returns `PortfolioDetails` object
   - Used by: KPI cards component
   - Returns: Aggregated portfolio metrics (total value, total invested, gains, etc.)

### Dashboard Requirements

#### 1. KPI Cards Section

Display four key metrics at the top of the dashboard:

- **Total Value**: Current market value of the entire portfolio
- **Total Value Invested**: Total amount invested across all accounts
- **Realised Gains (This Year)**: Year-to-date realized profits/losses
- **Daily Change**: Portfolio value change from previous day (amount and percentage)

**Component**: `src/app/dashboard/components/kpi/kpis.tsx`  
**Data Source**: `getDashboardSummary()` from `TrackNestApi.ts`  
**Type**: `PortfolioDetails` from `trackNestTypes.ts`

#### 2. Portfolio Performance Chart

Interactive area chart displaying portfolio value over time with:

- **Time Frame Selector**: Tabs for Day, Week, Month, YTD, 1Y, Max
- **Account Filter**: Dropdown to view combined portfolio or individual accounts
- **Chart Features**: 
  - Area chart with gradient fill
  - Custom tooltip showing date, value, and invested amount
  - Responsive design
  - Caching of fetched data for performance

**Component**: `src/app/dashboard/components/portfolioChart/portfilio-chart.tsx`  
**Data Source**: `getPortfolioHistory(timeFrame)` from `TrackNestApi.ts`  
**Type**: `PortfolioHistory` from `trackNestTypes.ts`

#### 3. Position Table

Comprehensive table displaying individual holdings with the following columns:

- **Ticker**: Asset symbol (e.g., AAPL, BTC, SPY)
- **Number of Assets**: Quantity of shares/units held
- **Market Value**: Current market value of the position
- **Price**: Current market price per unit
- **Invested Value**: Total amount invested in the position
- **Average Cost**: Average purchase price per unit
- **Profit/Loss**: Unrealized gain/loss (absolute and percentage)
- **Status**: Visual indicator (Profit/Loss badge)

**Additional Features**:
- Column visibility toggles
- Row selection
- Pagination
- Responsive design

**Component**: `src/app/dashboard/components/positionTable/data-table.tsx`  
**Data Source**: `getPositions()` from `TrackNestApi.ts`  
**Type**: `Position` from `trackNestTypes.ts` (note: currently uses a simplified `Position` type in `columns.tsx` that needs to align with `trackNestTypes.ts`)

### Data Type Alignment

The `Position` type used in the table component (`src/app/dashboard/components/positionTable/columns.tsx`) currently has a simplified structure:

```typescript
type Position = {
  ticker: string
  shares: number
  avgPrice: string
  currentPrice: string
  gain: string
  status: 'Profit' | 'Loss'
}
```

This should be updated to match the comprehensive `Position` type defined in `src/lib/trackNestTypes.ts`:

```typescript
type Position = {
  accountName: string
  assetType: string
  assetCategory: string
  assetTicket: string
  price: number
  marketValue: number
  averageCost: number
  cost: number
  amountOfAssets: number
  unrealisedProfit: number
}
```

## Long-Term Goals

### Document Generation

The application aims to provide document generation capabilities, including:

- **Yearly Statements**: Annual portfolio performance reports
- **Tax Documents**: Realized gains/losses statements for tax reporting
- **Account Summaries**: Individual account performance reports

These features will be implemented after the MVP backend integration is complete.

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── kpi/
│   │   │   │   └── kpis.tsx              # KPI cards component
│   │   │   ├── portfolioChart/
│   │   │   │   ├── chart.tsx             # Recharts area chart
│   │   │   │   ├── custom-tooltip.tsx    # Chart tooltip component
│   │   │   │   └── portfilio-chart.tsx   # Chart container with controls
│   │   │   └── positionTable/
│   │   │       ├── columns.tsx           # Table column definitions
│   │   │       └── data-table.tsx        # Table component
│   │   └── page.tsx                      # Dashboard page
│   ├── layout.tsx                        # Root layout with sidebar
│   └── globals.css                       # Global styles
├── components/
│   ├── ui/                               # shadcn/ui components
│   ├── sidebar.tsx                       # Navigation sidebar
│   └── spinner.tsx                       # Loading spinner
├── lib/
│   ├── trackNestTypes.ts                 # TypeScript type definitions
│   └── utils.ts                          # Utility functions
└── services/
    ├── TrackNestApi.ts                   # API service layer
    └── MockData.ts                       # Mock data for development
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the API URL to match your .NET backend endpoint.

### Development

Run the development server:


Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Deployment

The project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## API Integration Notes

### Backend Contract

The .NET API should return data matching the following TypeScript types:

- `PortfolioDetails`: Total portfolio metrics
- `PortfolioHistory`: Historical value points with account breakdown
- `Position[]`: Array of individual holdings

Refer to `src/lib/trackNestTypes.ts` for complete type definitions.

### Error Handling

The API service includes basic error handling that returns empty arrays or null values on failure. For production, consider implementing:

- User-friendly error messages
- Retry logic for failed requests
- Offline state handling
- Loading skeletons

## Contributing

This is a private project. For questions or issues, please contact the development team.

## License

Private project - All rights reserved.
