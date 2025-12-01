'use client'

import { Position } from '@/lib/types/DashboardTypes';
import { useMemo, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { 
    AllCommunityModule, 
    ColDef, 
    ModuleRegistry,
    CellStyleModule,
    ClientSideRowModelModule,
    ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
    AllCommunityModule,
    CellStyleModule,
    ClientSideRowModelModule,
    ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const currencyFormatter = (params: { value: number }) => {
    if (params.value == null) return "";
    return new Intl.NumberFormat('pt-PT', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(params.value);
};


interface PortfolioTableProps {
    positions: Position[];
}

export default function PortfolioTable({ positions }: PortfolioTableProps) {

    // Definições de Coluna Melhoradas
    const [colDefs] = useState<ColDef<Position>[]>([
        { 
            field: "assetTicket", 
            headerName: "Ativo",
            filter: true,
            flex: 1 
        },
        { 
            field: "amountOfAssets", 
            headerName: "Quantidade", 
            flex: 1 
        },
        { 
            field: "cost", 
            headerName: "Custo Unit.",
            valueFormatter: currencyFormatter,
            flex: 1
        },
        // Exemplo de coluna calculada (Total)
        {
            headerName: "Total Investido",
            valueGetter: (p) => (p.data ? p.data.amountOfAssets * p.data.cost : 0),
            valueFormatter: currencyFormatter,
            flex: 1,
            cellClass: "font-semibold text-gray-700"
        }
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
    }), []);

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
            
            <h2 className="text-lg font-bold text-gray-700 mb-4">
                Tabela de Posições
            </h2>

            <div className="flex-1 min-h-0 ag-theme-quartz"> 
                <AgGridReact
                    rowData={positions}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    className="h-full w-full"
                />
            </div>
        </div>        
    );
}