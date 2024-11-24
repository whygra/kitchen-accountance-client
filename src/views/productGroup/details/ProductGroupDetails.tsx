import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProductGroup, ProductGroupDTO, getProductGroupWithProducts } from '../../../api/productGroups';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import ProductsTable from '../../product/list/ProductsTable';
import { ProductField } from '../../../hooks/sort/useSortProducts';


function ProductGroupDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [productGroup, setProductGroup] = useState<ProductGroupDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Группа ингредиентов "${productGroup?.id}. ${productGroup?.name}"`}
    , [productGroup])

    useEffect(()=>{loadProductGroup()}, [])

    async function loadProductGroup() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id группы")
        
        setIsLoading(true)
        const productGroup = await getProductGroupWithProducts(parseInt(id??'0'))
        
        console.log(productGroup)
        
        if (productGroup === null)
            throw Error("Не удалось получить данные группы ингредиентов")
        
        setProductGroup(productGroup)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteProductGroup(id)
        navigate('/product-groups/all')
    }

    return isLoading ? (<Loading/>) : 
           productGroup===null ? (<>Не удалось получить данные группы</>) : (
        <>

            <Row className='mt-5'>
                <Link className='text-secondary' to='/product-groups/all'>Все группы ингредиентов...</Link>
                <div className='d-flex flex-row justify-content-between'>
                    <h3>{productGroup.id}. {productGroup.name}</h3>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={productGroup}
                        path='product-groups'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    /> 
                </div>
            <Col md={12}>
                
                <Card className="p-3">

                <ProductsTable products={productGroup.products??[]} fieldsToExclude={[ProductField.Group]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductGroupDetails;