import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import ProductCategoryListItem from './ProductCategoryListItem';
import { getProductCategoriesWithProducts, ProductCategoryDTO } from '../../../api/productCategories';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useProductCategoriesTableHeader from '../../../hooks/useProductCategoriesTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProductCategoryList() 
{
  
    const [productCategories, setProductCategories] = useState(new Array<ProductCategoryDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [productCategories])
  
    async function loadProductCategories() {
        setIsLoading(true)    
        try{
          const res = await getProductCategoriesWithProducts()
          setProductCategories(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProductCategories()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useProductCategoriesTableHeader()

    const filtered = productCategories
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Категории продуктов</h2>
        {
            hasPermission(UserPermissions.CRUD_PRODUCTS)
            ? <Link to={'/product-categories/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion className='accordion-button-ps-1pt'>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <ProductCategoryListItem productCategory={c} onDelete={async()=>{await loadProductCategories()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default ProductCategoryList;