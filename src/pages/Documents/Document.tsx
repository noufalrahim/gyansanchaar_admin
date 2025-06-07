import { columns } from '@/columns/ApplicationColumn'
import { ColumnDef } from '@tanstack/react-table';
import { TableComponent } from '@/components/Table'
import { useReadData } from '@/hooks/useReadData'
import formatApplicationData from '@/lib/DataFormatter/applicationDataFormatter';
import { ApplicationJoinType } from '@/types/ApplicationJoinType';

export default function Documents() {
    const date = new Date('2000-01-01');
    const {data, isLoading, isError } = useReadData<ApplicationJoinType[]>('applications', `/applications/fields/many?createdAt[gte]=${date.toISOString()}`);

    const formattedData = formatApplicationData(data)?.map(item => ({
        ...item,
        id: item.id || '', // Ensure id is always a string
    }));
    console.log(formattedData);
    if(isLoading){
        return <h1>Loading</h1>;
    };

    if(isError){
        return <h1>An error occured</h1>;
    };

    console.log(data);
    return (
        <div>
            <TableComponent columns={columns as ColumnDef<{ id: string; }>[] } data={formattedData!} 
            // filterColumn={'application.id'} 
            onClickTo={'/applications'}/>
        </div>
    )
};
