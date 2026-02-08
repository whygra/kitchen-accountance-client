import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import IngredientTagsTableHeader from '../views/ingredientTag/list/IngredientTagTableHeader';
import useFilterIngredientTags from './filter/useFilterIngredientTags';
import useSortIngredientTags, { IngredientTagField } from './sort/useSortIngredientTags';

function useIngredientTagsTableHeader(filtersOpen?: boolean, fieldsToExclude?:IngredientTagField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterIngredientTags()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortIngredientTags()

    const header = 
        <IngredientTagsTableHeader
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

export default useIngredientTagsTableHeader;