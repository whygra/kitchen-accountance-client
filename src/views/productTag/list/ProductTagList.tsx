import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import ProductTagListItem from './ProductTagListItem';
import { getProductTagsWithProducts, ProductTagDTO } from '../../../api/nomenclature/productTags';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useProductTagsTableHeader from '../../../hooks/useProductTagsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProductTagList() 
{
  
    const [productTags, setProductTags] = useState(new Array<ProductTagDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [productTags])
  
    async function loadProductTags() {
        setIsLoading(true)    
        try{
          const res = await getProductTagsWithProducts()
          setProductTags(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProductTags()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useProductTagsTableHeader()

    const filtered = productTags
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Группы проектов</h2>
        {
            hasPermission(UserPermissions.CRUD_PRODUCTS)
            ? <Link to={'/product-tags/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion className='accordion-button-ps-1pt'>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <ProductTagListItem productTag={c} onDelete={async()=>{await loadProductTags()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default ProductTagList;