import { Accordion, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductGramCost from './ProductGramCost';
import ProductPurchaseOptionsTable from './ProductPurchaseOptionsTable';
import { appContext } from '../../../context/AppContextProvider';
import { deleteProduct, getProductWithPurchaseOptions, ProductDTO } from '../../../api/nomenclature/products';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import ProductIngredientsTable from './ProductIngredientsTable';
import Loading from '../../shared/Loading';
import UpdatedAt from '../../shared/UpdatedAt';


function ProductDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<ProductDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()    
    
    useEffect(()=>{
        document.title = `Продукт "${product?.name}"`}
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
                
            <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={product}
                        path='products'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{product.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={product}/>
                </Col>

                <ul className='list-group ps-2'>
                    <li className='list-group-item'>
                        Категория: "{product.category?.name 
                            ? <Link to={`/product-categories/details/${product.category.id}`}>{product.category.name}</Link> 
                            : '-без категории-'}"</li>
                    <li className='list-group-item'>
                        Группа: "{product.group?.name 
                            ? <Link to={`/product-groups/details/${product.group.id}`}>{product.group.name}</Link> 
                            : '-без группы-'}"</li>
                </ul>
                
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