import { SaleActDTO, getSaleActsWithItems } from '../../../../api/storage/saleActs';
import useSaleActsTableHeader from '../../../../hooks/useSaleActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import SaleActsTableItem from './SaleActTableItem';
import { SaleActField } from '../../../../hooks/sort/useSortSaleAct';

interface SaleActTableProps {
    saleActs: SaleActDTO[]
    fieldsToExclude: SaleActField[]
}

function SaleActsTable({saleActs, fieldsToExclude}:SaleActTableProps) 
{
    const {header, getComparer, getPredicate} = useSaleActsTableHeader(
        false, 
        fieldsToExclude
    )
    
    const filtered = saleActs
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
                            <SaleActsTableItem 
                                saleAct={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </div>
                    )
            }
        {nav}
        </div>
    )
}

export default SaleActsTable;