import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import ProductGroupsTableHeader from '../views/productGroup/list/ProductGroupTableHeader';
import useFilterProductGroups from './filter/useFilterProductGroups';
import useSortProductGroups, { ProductGroupField } from './sort/useSortProductGroups';

function useProductGroupsTableHeader(filtersOpen?: boolean, fieldsToExclude?:ProductGroupField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterProductGroups()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortProductGroups()

    const header = 
        <ProductGroupsTableHeader
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

export default useProductGroupsTableHeader;