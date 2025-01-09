import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Row } from 'react-bootstrap';
import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getProductsWithPurchaseOptions, ProductDTO } from '../../../api/products';
import { UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProductList() 
{
  
    const [products, setProducts] = useState(new Array<ProductDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadProducts() {
        setIsLoading(true)    
        try{
          const res = await getProductsWithPurchaseOptions()
          setProducts(res ?? [])
          console.group(res)
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProducts()},[])

    useEffect(()=>{
        document.title = "Продукты"}
    , [products])
        
    const {getPredicate, getComparer, header} = useProductsTableHeader()
    const filtered = products
        .filter(getPredicate())
        .sort(getComparer())
    const {sliceLimits, nav} = usePagination(filtered.length) 
  
    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Продукты</h2>
        {
            hasPermission(UserPermissions.CRUD_PRODUCTS)
            ? 
            <Link to={'/products/create'}>
                <Button variant='success'>Создать</Button>
            </Link>
            : <></>
        }
        </div>
        <hr/>
                {header}
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <ProductListItem product={c} onDelete={async()=>{await loadProducts()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default ProductList;