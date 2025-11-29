import React from 'react';

// 4. Componente Detalhes (Inferior Direito)
export const PortfolioDetails = () => (
    <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Detalhes</h2>
        <div className="flex-1 space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Valor Total</p>
                <p className="text-xl font-bold text-gray-800">€ 24,500.00</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Lucro/Prejuízo</p>
                <p className="text-md font-semibold text-green-600">+ € 1,200.00 (5%)</p>
            </div>
            <div className="h-full border border-gray-100 border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Mais informações...
            </div>
        </div>
    </div>
);
