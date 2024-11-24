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
        <>
        <Table>
            {header}
            <tbody>
            {   
                filtered
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=>
                        <tr>
                            <ProductsTableItem 
                                product={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </tr>
                    )
            }
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default ProductsTable;