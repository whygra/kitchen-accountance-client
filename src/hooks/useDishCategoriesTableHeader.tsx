import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import DishCategoriesTableHeader from '../views/dishCategory/list/DishCategoriesTableHeader';
import useFilterDishCategories from './filter/useFilterDishCategories';
import useSortDishCategories, { DishCategoryField } from './sort/useSortDishCategories';

function useDishCategoriesTableHeader(filtersOpen?: boolean, fieldsToExclude?:DishCategoryField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterDishCategories()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortDishCategories()

    const header = 
        <DishCategoriesTableHeader
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

export default useDishCategoriesTableHeader;