import InventoryActsTableHeader from '../views/storage/inventoryAct/list/InventoryActsTableHeader';
import useFilterInventoryActs from './filter/useFilterInventoryActs';
import useSort from './sort/useSort';
import { InventoryActDTO } from '../api/storage/inventoryActs';
import { InventoryActComparers, InventoryActField } from './sort/useSortInventoryAct';

function useInventoryActsTableHeader(filtersOpen?: boolean, fieldsToExclude?:InventoryActField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterInventoryActs()
    const {toggleSort, sortField, sortIsDesc, getComparer} = 
        useSort<InventoryActField, InventoryActDTO>(InventoryActField.None, InventoryActComparers)

    const header = 
        <InventoryActsTableHeader
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

export default useInventoryActsTableHeader;