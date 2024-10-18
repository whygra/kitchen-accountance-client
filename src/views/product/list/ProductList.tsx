import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Image, Row, Table } from 'react-bootstrap';
import { IngredientDTO, getIngredientsWithProducts } from '../../../api/ingredients';
import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { getProducts, getProductsWithPurchaseOptions, getProductWithPurchaseOptions, ProductDTO } from '../../../api/products';
import PaginationNav from '../../shared/PaginationNav';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import Loading from '../../shared/Loading';

function ProductList() 
{
  
    const [products, setProducts] = useState(new Array<ProductDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(authContext)
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
    const {sliceLimits, paginationNav} = usePagination(filtered.length) 
  
    return isLoading ? (<Loading/>) : (
        <>
        {
            hasPermission(UserPermissions.CRUD_PRODUCTS)
            ? 
            <Link to={'/products/create'}>
                <Button variant='success'>Создать</Button>
            </Link>
            : <></>
        }
        <Row className='ps-1'>
            {header}
        </Row>
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <ProductListItem product={c} onDelete={async()=>{await loadProducts()}}/>
            )}
        </Accordion>
        {paginationNav}
        </>
    )
}

export default ProductList;