import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import ProductGroupListItem from './ProductGroupListItem';
import { getProductGroupsWithProducts, ProductGroupDTO } from '../../../api/productGroups';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useProductGroupsTableHeader from '../../../hooks/useProductGroupsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProductGroupList() 
{
  
    const [productGroups, setProductGroups] = useState(new Array<ProductGroupDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [productGroups])
  
    async function loadProductGroups() {
        setIsLoading(true)    
        try{
          const res = await getProductGroupsWithProducts()
          setProductGroups(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProductGroups()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useProductGroupsTableHeader()

    const filtered = productGroups
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Группы проектов</h2>
        {
            hasPermission(UserPermissions.CRUD_PRODUCTS)
            ? <Link to={'/product-groups/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <ProductGroupListItem productGroup={c} onDelete={async()=>{await loadProductGroups()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default ProductGroupList;