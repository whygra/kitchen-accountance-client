import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import ProductTagsTableHeader from '../views/productTag/list/ProductTagTableHeader';
import useFilterProductTags from './filter/useFilterProductTags';
import useSortProductTags, { ProductTagField } from './sort/useSortProductTags';

function useProductTagsTableHeader(filtersOpen?: boolean, fieldsToExclude?:ProductTagField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterProductTags()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortProductTags()

    const header = 
        <ProductTagsTableHeader
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

export default useProductTagsTableHeader;