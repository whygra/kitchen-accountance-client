import ProductsTableHeader from '../views/product/list/ProductsTableHeader';
import useFilterProducts from './filter/useFilterProducts';
import useSortProducts, { ProductField } from './sort/useSortProducts';

interface ProductsHeaderHookProps {
    tags?: string[],
    filtersOpen?:boolean,
    fieldsToExclude?:ProductField[]
}
function useProductsTableHeader({
    tags,
    filtersOpen,
    fieldsToExclude,
} : ProductsHeaderHookProps) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterProducts()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortProducts()

    const header = 
        <ProductsTableHeader
            tags={tags}
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

export default useProductsTableHeader;