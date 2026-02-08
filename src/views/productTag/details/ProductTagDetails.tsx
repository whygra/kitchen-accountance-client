import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProductTag, ProductTagDTO, getProductTagWithProducts } from '../../../api/nomenclature/productTags';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import ProductsTable from '../../product/list/ProductsTable';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import UpdatedAt from '../../shared/UpdatedAt';


function ProductTagDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [productTag, setProductTag] = useState<ProductTagDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Группа ингредиентов "${productTag?.name}"`}
    , [productTag])

    useEffect(()=>{loadProductTag()}, [])

    async function loadProductTag() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id группы")
        
        setIsLoading(true)
        const productTag = await getProductTagWithProducts(parseInt(id??'0'))
                
        if (productTag === null)
            throw Error("Не удалось получить данные группы ингредиентов")
        
        setProductTag(productTag)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteProductTag(id)
        navigate('/product-tags/all')
    }

    return isLoading ? (<Loading/>) : 
           productTag===null ? (<>Не удалось получить данные группы</>) : (
        <>

            <Row className='mt-5'>

            <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={productTag}
                        path='product-tags'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{productTag.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={productTag}/>
                </Col>
            <Col md={12}>
                
                <Card className="p-3">

                <h5 className='w-100 text-center'>Продукты</h5>
                <ProductsTable products={productTag.products??[]} fieldsToExclude={[ProductField.Tag]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductTagDetails;