import { PurchaseActDTO, getPurchaseActsWithItems } from '../../../../api/storage/purchaseActs';
import usePurchaseActsTableHeader from '../../../../hooks/usePurchaseActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import PurchaseActsTableItem from './PurchaseActTableItem';
import { PurchaseActField } from '../../../../hooks/sort/useSortPurchaseAct';

interface PurchaseActTableProps {
    purchaseActs: PurchaseActDTO[]
    fieldsToExclude: PurchaseActField[]
}

function PurchaseActsTable({purchaseActs, fieldsToExclude}:PurchaseActTableProps) 
{
    const {header, getComparer, getPredicate} = usePurchaseActsTableHeader(
        false,
        fieldsToExclude
    )
    
    const filtered = purchaseActs
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
                            <PurchaseActsTableItem 
                                purchaseAct={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </div>
                    )
            }
        {nav}
        </div>
    )
}

export default PurchaseActsTable;