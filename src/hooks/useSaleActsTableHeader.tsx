import SaleActsTableHeader from '../views/storage/saleAct/list/SaleActsTableHeader';
import useFilterSaleActs from './filter/useFilterSaleActs';
import useSort from './sort/useSort';
import { SaleActDTO } from '../api/storage/saleActs';
import { SaleActComparers, SaleActField } from './sort/useSortSaleAct';

function useSaleActsTableHeader(filtersOpen?: boolean, fieldsToExclude?:SaleActField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterSaleActs()
    const {toggleSort, sortField, sortIsDesc, getComparer} = 
        useSort<SaleActField, SaleActDTO>(SaleActField.None, SaleActComparers)

    const header = 
        <SaleActsTableHeader
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

export default useSaleActsTableHeader;