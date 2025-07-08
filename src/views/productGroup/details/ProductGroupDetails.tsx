import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProductGroup, ProductGroupDTO, getProductGroupWithProducts } from '../../../api/nomenclature/productGroups';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import ProductsTable from '../../product/list/ProductsTable';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import UpdatedAt from '../../shared/UpdatedAt';


function ProductGroupDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [productGroup, setProductGroup] = useState<ProductGroupDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Группа ингредиентов "${productGroup?.name}"`}
    , [productGroup])

    useEffect(()=>{loadProductGroup()}, [])

    async function loadProductGroup() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id группы")
        
        setIsLoading(true)
        const productGroup = await getProductGroupWithProducts(parseInt(id??'0'))
                
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

            <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={productGroup}
                        path='product-groups'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{productGroup.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={productGroup}/>
                </Col>
            <Col md={12}>
                
                <Card className="p-3">

                <h5 className='w-100 text-center'>Продукты</h5>
                <ProductsTable products={productGroup.products??[]} fieldsToExclude={[ProductField.Group]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductGroupDetails;