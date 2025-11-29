'use client'

import { Position } from '../../../modules/Position';
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

export default function PositionsTable() {

    // Dados Mockados
    const positions: Position[] = useMemo(() => [
        new Position({ assetTicket: "ASML", amountOfAssets: 10, cost: 100 }),
        new Position({ assetTicket: "NVDA", amountOfAssets: 10, cost: 111 }),
        new Position({ assetTicket: "HOOD", amountOfAssets: 10, cost: 999 })
    ], []);

    const [rowData] = useState<Position[]>(positions);

    // Definições de Coluna Melhoradas
    const [colDefs] = useState<ColDef<Position>[]>([
        { 
            field: "assetTicket", 
            headerName: "Ativo", // Nome em Português
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
            valueFormatter: currencyFormatter, // Usando o novo formatador
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
        // 1. O WRAPPER DO CARD (Estilo Dashboard)
        // h-full: Ocupa a célula inteira do Grid do pai
        // flex flex-col: Permite ter título em cima e tabela em baixo
        <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
            
            {/* 2. O TÍTULO DO COMPONENTE */}
            <h2 className="text-lg font-bold text-gray-700 mb-4">
                Tabela de Posições
            </h2>

            {/* 3. A ÁREA DA TABELA 
               flex-1: Faz a tabela crescer para ocupar todo o espaço restante do card
               min-h-0: Crucial para o scroll funcionar dentro do Flexbox
               ag-theme-quartz: Um tema mais moderno e limpo que o alpine (opcional)
            */}
            <div className="flex-1 min-h-0 ag-theme-quartz"> 
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    // Removemos estilos inline para usar classes Tailwind
                    className="h-full w-full"
                />
            </div>
        </div>        
    );
}