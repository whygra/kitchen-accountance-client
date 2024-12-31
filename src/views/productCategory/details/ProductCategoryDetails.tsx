import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProductCategory, ProductCategoryDTO, getProductCategoryWithProducts } from '../../../api/productCategories';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import ProductsTable from '../../product/list/ProductsTable';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import UpdatedAt from '../../shared/UpdatedAt';


function ProductCategoryDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [productCategory, setProductCategory] = useState<ProductCategoryDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Категория ингредиентов "${productCategory?.id}. ${productCategory?.name}"`}
    , [productCategory])

    useEffect(()=>{loadProductCategory()}, [])

    async function loadProductCategory() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id блюда")
        
        setIsLoading(true)
        const productCategory = await getProductCategoryWithProducts(parseInt(id??'0'))
                
        if (productCategory === null)
            throw Error("Не удалось получить данные о блюде")
        
        setProductCategory(productCategory)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteProductCategory(id)
        navigate('/product-categories/all')
    }

    return isLoading ? (<Loading/>) : 
           productCategory===null ? (<>Не удалось получить данные категории</>) : (
        <>

            <Row className='mt-5'>

            <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={productCategory}
                        path='product-categories'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{`${productCategory.id}. ${productCategory.name}`}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={productCategory}/>
                </Col>
            <div className='d-flex flex-row justify-content-between'>
            </div>
            <Col md={12}>
                
                <Card className="p-3">
                <h5 className='w-100 text-center'>Продукты</h5>
                <ProductsTable products={productCategory.products??[]} fieldsToExclude={[ProductField.Category]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductCategoryDetails;