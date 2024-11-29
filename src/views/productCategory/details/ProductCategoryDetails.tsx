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
        
        console.log(productCategory)
        
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
            <div className='d-flex flex-row justify-content-between align-items-end'>
                <div>
                <Link className='text-secondary' to='/product-categories/all'>&lt; Все категории продуктов...</Link>
                <h3>{productCategory.id}. {productCategory.name}</h3>
                </div>
                
                <div>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={productCategory}
                        path='product-categories'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    /> 
                    <UpdatedAt entity={productCategory}/>
                </div>
            </div>
            <div className='d-flex flex-row justify-content-between'>
            </div>
            <Col md={12}>
                
                <Card className="p-3">

                <ProductsTable products={productCategory.products??[]} fieldsToExclude={[ProductField.Category]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductCategoryDetails;