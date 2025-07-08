import { InventoryActDTO, getInventoryActsWithItems } from '../../../../api/storage/inventoryActs';
import useInventoryActsTableHeader from '../../../../hooks/useInventoryActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import InventoryActsTableItem from './InventoryActTableItem';
import { InventoryActField } from '../../../../hooks/sort/useSortInventoryAct';

interface InventoryActTableProps {
    inventoryActs: InventoryActDTO[]
    fieldsToExclude: InventoryActField[]
}

function InventoryActsTable({inventoryActs, fieldsToExclude}:InventoryActTableProps) 
{
    const {header, getComparer, getPredicate} = useInventoryActsTableHeader(
        false, 
        fieldsToExclude
    )
    
    const filtered = inventoryActs
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
                            <InventoryActsTableItem 
                                inventoryAct={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </div>
                    )
            }
        {nav}
        </div>
    )
}

export default InventoryActsTable;