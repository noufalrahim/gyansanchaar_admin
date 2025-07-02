import { formattedColumns } from '@/columns/ApplicationColumn'
import { TableComponent } from '@/components/Table'
import { useReadData } from '@/hooks/useReadData'
import formatApplicationData from '@/lib/DataFormatter/applicationDataFormatter';
import { ApplicationJoinType } from '@/types/ApplicationJoinType';
import { Loader2 } from 'lucide-react';

export default function Applications() {
    const date = new Date('2000-01-01');
    const {data, isLoading, isError } = useReadData<ApplicationJoinType[]>('applications', `/applications/fields/many?createdAt[gte]=${date.toISOString()}`);

    const formattedData = formatApplicationData(data);
    console.log(formattedData);
    if(isLoading){
        return (
            <div className="h-screen items-center flex justify-center items-center">
                        <Loader2 className="mr-2 h-7 w-7 animate-spin" />
                    </div>
        )
    };

    if(isError){
        return <h1>An error occured</h1>;
    };

    console.log(data);

    return (
        <div>
            <TableComponent columns={formattedColumns} data={formattedData!} 
            // filterColumn={'application.id'} 
            onClickTo={'/applications'}/>
        </div>
    )
};
