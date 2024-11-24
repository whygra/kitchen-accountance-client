import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import IngredientGroupsTableHeader from '../views/ingredientGroup/list/IngredientGroupTableHeader';
import useFilterIngredientGroups from './filter/useFilterIngredientGroups';
import useSortIngredientGroups, { IngredientGroupField } from './sort/useSortIngredientGroups';

function useIngredientGroupsTableHeader(filtersOpen?: boolean, fieldsToExclude?:IngredientGroupField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterIngredientGroups()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortIngredientGroups()

    const header = 
        <IngredientGroupsTableHeader
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

export default useIngredientGroupsTableHeader;