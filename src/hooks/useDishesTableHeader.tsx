import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';

interface DishesTableHookProps {
    tags?: string[], 
    filtersOpen?: boolean, 
    fieldsToExclude?:DishField[]
}

function useDishesTableHeader({tags, filtersOpen, fieldsToExclude}:DishesTableHookProps) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterDishes()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortDishes()
    const header = 
        <DishesTableHeader
            filtersOpen={filtersOpen}
            fieldsToExclude={fieldsToExclude}
            toggleSort={toggleSort}
            activeField={sortField}
            sortIsDesc={sortIsDesc}
            searchData={searchData}
            setSearchData={setSearchData}
            tags={tags}
        />
        
    return {
        getPredicate,
        getComparer,
        header
    }
}

export default useDishesTableHeader;