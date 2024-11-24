import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import DishGroupsTableHeader from '../views/dishGroup/list/DishGroupTableHeader';
import useFilterDishGroups from './filter/useFilterDishGroups';
import useSortDishGroups, { DishGroupField } from './sort/useSortDishGroups';

function useDishGroupsTableHeader(filtersOpen?: boolean, fieldsToExclude?:DishGroupField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterDishGroups()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortDishGroups()

    const header = 
        <DishGroupsTableHeader
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

export default useDishGroupsTableHeader;