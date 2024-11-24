import { Accordion, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductGramCost from './ProductGramCost';
import ProductPurchaseOptionsTable from './ProductPurchaseOptionsTable';
import { appContext } from '../../../context/AppContextProvider';
import { deleteProduct, getProductWithPurchaseOptions, ProductDTO } from '../../../api/products';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import ProductIngredientsTable from './ProductIngredientsTable';
import Loading from '../../shared/Loading';


function ProductDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<ProductDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()    
    
    useEffect(()=>{
        document.title = `Продукт "${product?.id}. ${product?.name}"`}
    , [product])

    useEffect(()=>{loadProduct()}, [])

    async function loadProduct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id продукта")
            
            setIsLoading(true)
            const product = await getProductWithPurchaseOptions(parseInt(id))
            
            if (product === null)
                throw Error("Не удалось получить данные продукта")
            
            setProduct(product)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteProduct(id)
        navigate('/products/all')
    }

    return isLoading ? (<Loading/>) : 
           product===null ? (<>Не удалось получить продукт</>) : (
        <>
            <Row className='mt-5'>
            <div className='d-flex justify-content-between'>
                <h3 className='text-center'>{`${product.id}. ${product.name}`}</h3>
                <CUDButtons
                    requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    path='products'
                    deleteFn={deleteFn} 
                    entity={product}
                />
            </div>
            <div className='d-flex fw-bold flex-column pt-2 pb-4 ps-4'>
                <span>Категория: "{product.category?.name ?? '-без категории-'}"</span>
                <span>Группа: "{product.group?.name ?? '-без группы-'}"</span>
            </div>
            <Col md={12}>
                <Card className="p-3">
                <ProductPurchaseOptionsTable product={product}/>
                <ProductGramCost product={product}/>

                </Card>
            </Col>
            <Col md={12}>
                <Card className="p-3">
                <ProductIngredientsTable product={product}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ProductDetails;