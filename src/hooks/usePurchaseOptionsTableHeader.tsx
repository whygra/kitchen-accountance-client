import PurchaseOptionsTableHeader from '../views/purchase_option/table/PurchaseOptionsTableHeader';
import useFilterPurchaseOptions from './filter/useFilterPurchaseOptions';
import useSortPurchaseOptions, { PurchaseOptionField } from './sort/useSortPurchaseOptions';

function usePurchaseOptionsTableHeader(filtersOpen?: boolean, fieldsToExclude?:PurchaseOptionField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterPurchaseOptions()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortPurchaseOptions()
    const header = 
        <PurchaseOptionsTableHeader
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

export default usePurchaseOptionsTableHeader;