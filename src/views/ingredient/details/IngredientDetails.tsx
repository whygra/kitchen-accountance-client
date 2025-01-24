import { Accordion, Button, Card, Col, Form, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { IngredientDTO, deleteIngredient, getIngredientWithProducts, getIngredientWithPurchaseOptions } from '../../../api/ingredients';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductsWeightsCalculator from './ProductsWeightsCalculator';
import IngredientProductsTable from './IngredientProductsTable';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import IngredientDishesTable from './IngredientDishesTable';
import Loading from '../../shared/Loading';
import UpdatedAt from '../../shared/UpdatedAt';
import Markdown from 'react-markdown';


function IngredientDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredient, setIngredient] = useState<IngredientDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Ингредиент "${ingredient?.name}"`}
    , [ingredient])

    useEffect(()=>{loadIngredient()}, [])

    async function loadIngredient() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id ингредиента")
            
            setIsLoading(true)
            const ingredient = await getIngredientWithProducts(parseInt(id??'0'))
            
            if (ingredient === null)
                throw Error("Не удалось получить данные ингредиента")
            

            setIngredient(ingredient)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteIngredient(id)
        navigate('/ingredients/all')
    }

    return isLoading ? (<Loading/>) : 
           ingredient===null ? (<>Не удалось получить данные ингредиента</>) : (
        <>
            <Row className='mt-5'>
                
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={ingredient}
                        path='ingredients'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{ingredient.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={ingredient}/>
                </Col>
                <ul className='list-group ps-2'>
                    <li className='list-group-item'>Тип: "{ingredient.type?.name}"</li>                    
                    <li className='list-group-item'>
                        Категория: "{ingredient.category?.name 
                            ? <Link to={`/ingredient-categories/details/${ingredient.category.id}`}>{ingredient.category.name}</Link> 
                            : '-без категории-'}"</li>
                    <li className='list-group-item'>
                        Группа: "{ingredient.group?.name 
                            ? <Link to={`/ingredient-groups/details/${ingredient.group.id}`}>{ingredient.group.name}</Link> 
                            : '-без группы-'}"</li>
                    <li className='list-group-item'>Средний процент отхода: {ingredient?.avg_waste_percentage?.toFixed(2)}</li>
                    {ingredient.is_item_measured
                        ?<li className='list-group-item'>Вес 1шт: {ingredient.item_weight} г.</li>
                        :<></>
                    }
                </ul>
                
                    
            <Col xl={6} lg={12} sm={12}>
                <Card className="p-3">
                <IngredientProductsTable ingredient={ingredient}/>
                {ingredient.description
                    ?
                    <p className='border-y bg-light p-3'>
                        <h5>Описание</h5>
                        <Markdown>
                            {ingredient.description}
                        </Markdown>
                    </p>
                    : <></>
                }
                </Card>
            </Col>

            <Col xl={6} lg={12} sm={12}>
                <Card className="p-3">

                <IngredientDishesTable ingredient={ingredient}/>
                </Card>
            </Col>
            <Col sm={12}>
                <Card className="p-3">

                <ProductsWeightsCalculator ingredient={ingredient}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientDetails;