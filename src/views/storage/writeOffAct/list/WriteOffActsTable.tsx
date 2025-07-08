import { WriteOffActDTO, getWriteOffActsWithItems } from '../../../../api/storage/writeOffActs';
import useWriteOffActsTableHeader from '../../../../hooks/useWriteOffActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import WriteOffActsTableItem from './WriteOffActTableItem';
import { WriteOffActField } from '../../../../hooks/sort/useSortWriteOffAct';

interface WriteOffActTableProps {
    writeOffActs: WriteOffActDTO[]
    fieldsToExclude: WriteOffActField[]
}

function WriteOffActsTable({writeOffActs, fieldsToExclude}:WriteOffActTableProps) 
{
    const {header, getComparer, getPredicate} = useWriteOffActsTableHeader(
        false, 
        fieldsToExclude
    )
    
    const filtered = writeOffActs
        ?.filter(getPredicate())
        .sort(getComparer())
    
    const {sliceLimits, nav} = usePagination(filtered.length);

    return (
        <div className='mb-3'>
            {header}
            {   
                filtered
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=>
                        <div className='pe-5 border-bottom'>
                            <WriteOffActsTableItem 
                                writeOffAct={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </div>
                    )
            }
        {nav}
        </div>
    )
}

export default WriteOffActsTable;