import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { MOCK_POSITIONS } from '@/services/MockData';

export default function PositionsTable() {

    return (
        <DataTable columns={columns} data={MOCK_POSITIONS} />
    );
}