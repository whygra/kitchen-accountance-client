import PurchaseActsTableHeader from '../views/storage/purchaseAct/list/PurchaseActsTableHeader';
import useFilterPurchaseActs from './filter/useFilterPurchaseActs';
import useSort from './sort/useSort';
import { PurchaseActDTO } from '../api/storage/purchaseActs';
import { PurchaseActComparers, PurchaseActField } from './sort/useSortPurchaseAct';

function usePurchaseActsTableHeader(filtersOpen?: boolean, fieldsToExclude?:PurchaseActField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterPurchaseActs()
    const {toggleSort, sortField, sortIsDesc, getComparer} = 
        useSort<PurchaseActField, PurchaseActDTO>(PurchaseActField.None, PurchaseActComparers)

    const header = 
        <PurchaseActsTableHeader
            filtersOpen={filtersOpen}
            fieldsToExclude={fieldsToExclude}
            toggleSort={toggleSort}
            activeField={sortField}
            sortIsDesc={sortIsDesc}
            searchData={searchData}
            setSearchData={setSearchData}
        />
        
    return {
        getPredicate,
        getComparer,
        header
    }
}

export default usePurchaseActsTableHeader;