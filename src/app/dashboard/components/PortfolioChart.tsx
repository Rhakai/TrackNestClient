'use client';

import { PortfolioValue } from "@/lib/types/DashboardTypes";

interface PortfolioChartProps {
    portfolioHistory: PortfolioValue[]
};

export default function PortfolioChart({ portfolioHistory }: PortfolioChartProps) {
    
    return(
        <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Gráfico de Performance (XY)</h2>
            <div className="flex-1 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 border-dashed">
                <span className="text-blue-400 font-medium">Área do Gráfico de Linhas</span>
            </div>
        </div>
    );
};