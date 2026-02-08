import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Row } from 'react-bootstrap';
import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getProductsWithPurchaseOptions, ProductDTO } from '../../../api/nomenclature/products';
import { UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import { getProductTags } from '../../../api/nomenclature/productTags';

function ProductList() 
{
  
    const [products, setProducts] = useState(new Array<ProductDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()

    async function loadTags() {
        try{
          const res = await getProductTags()
          setTags((res ?? []).map(t=>t.name))
        }
        catch (error: Error | any) {
          console.log(error)
        }
    }
  
    async function loadProducts() {
        setIsLoading(true)    
        try{
          const res = await getProductsWithPurchaseOptions()
          setProducts(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        loadProducts()
        loadTags()
    },[])

    useEffect(()=>{
        document.title = "Продукты"}
    , [products])
        
    const {getPredicate, getComparer, header} = useProductsTableHeader({tags})
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
        <Accordion className='accordion-button-ps-1pt'>
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