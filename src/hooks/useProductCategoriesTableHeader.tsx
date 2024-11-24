import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import ProductCategoriesTableHeader from '../views/productCategory/list/ProductCategoryTableHeader';
import useFilterProductCategories from './filter/useFilterProductCategories';
import useSortProductCategories, { ProductCategoryField } from './sort/useSortProductCategories';

function useProductCategoriesTableHeader(filtersOpen?: boolean, fieldsToExclude?:ProductCategoryField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterProductCategories()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortProductCategories()

    const header = 
        <ProductCategoriesTableHeader
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

export default useProductCategoriesTableHeader;