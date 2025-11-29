import React from 'react';

// 3. Componente Gráfico Pie (Superior Direito)
export const AllocationPieChart = () => (
    <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Alocação</h2>
        <div className="flex-1 flex items-center justify-center">
            {/* Simulação visual de um gráfico circular */}
            <div className="w-40 h-40 rounded-full border-8 border-indigo-100 border-t-indigo-500 border-r-purple-400 flex items-center justify-center bg-gray-50">
                <span className="text-xs text-gray-400">Pie Chart</span>
            </div>
        </div>
    </div>
);
