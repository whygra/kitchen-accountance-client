import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import DishTagsTableHeader from '../views/dishTag/list/DishTagTableHeader';
import useFilterDishTags from './filter/useFilterDishTags';
import useSortDishTags, { DishTagField } from './sort/useSortDishTags';

function useDishTagsTableHeader(filtersOpen?: boolean, fieldsToExclude?:DishTagField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterDishTags()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortDishTags()

    const header = 
        <DishTagsTableHeader
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

export default useDishTagsTableHeader;