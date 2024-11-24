import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import IngredientCategoriesTableHeader from '../views/ingredientCategory/list/IngredientCategoryTableHeader';
import useFilterIngredientCategories from './filter/useFilterIngredientCategories';
import useSortIngredientCategories, { IngredientCategoryField } from './sort/useSortIngredientCategories';

function useIngredientCategoriesTableHeader(filtersOpen?: boolean, fieldsToExclude?:IngredientCategoryField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterIngredientCategories()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortIngredientCategories()

    const header = 
        <IngredientCategoriesTableHeader
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

export default useIngredientCategoriesTableHeader;