import { Table } from 'react-bootstrap';
import { ProductDTO } from '../../../api/products';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import usePagination from '../../../hooks/usePagination';
import ProductsTableItem from './ProductsTableItem';
import { ProductField } from '../../../hooks/sort/useSortProducts';

interface ProductTableProps {
    products: ProductDTO[]
    fieldsToExclude: ProductField[]
}

function ProductsTable({products, fieldsToExclude}:ProductTableProps) 
{
    const {header, getComparer, getPredicate} = useProductsTableHeader(
        false,
        fieldsToExclude
    )
    
    const filtered = products
        ?.filter(getPredicate())
        .sort(getComparer())
    
    const {sliceLimits, nav} = usePagination(filtered.length);

    return (
        <div className='mb-3'>
            {header}
            {   
                filtered
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=><div className='border-bottom pe-5'>
                            <ProductsTableItem 
                                product={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                            </div>
                    )
            }
        {nav}
        </div>
    )
}

export default ProductsTable;