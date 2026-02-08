import { Accordion, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { IngredientDTO, deleteIngredient, getIngredientWithProducts, getIngredientWithPurchaseOptions } from '../../../api/nomenclature/ingredients';
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
import IngredientIngredientsTable from './IngredientIngredientsTable';
import Tags from '../../shared/tags/Tags';


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
            const ingredient = await getIngredientWithPurchaseOptions(parseInt(id??'0'))
            
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
                <ul className='list-tag ps-2'>
                    <li className='list-tag-item'>Тип: "{ingredient.type?.name}"</li>
                    <li className='list-tag-item'>Средний процент отхода: {ingredient?.avg_waste_percentage?.toFixed(2)}</li>
                    {ingredient.is_item_measured
                        ?<li className='list-tag-item'>Вес 1шт: {ingredient.item_weight} г.</li>
                        :<></>
                    }
                </ul>
                
            <Col xl={6} lg={12} sm={12}>
                <Card className="p-3">
                <IngredientProductsTable ingredient={ingredient}/>
                <IngredientIngredientsTable ingredient={ingredient}/>
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
            
            {
                ingredient.tags && ingredient.tags.length > 0
                ?
                <Col md={12} lg={6}>
                    <Card>
                        <h5>Теги</h5>
                        <Tags tags={ingredient?.tags?.map(t=>{return{name:t.name, link:`/ingredient-tags/${t.id}`}})??[]}/>
                    </Card>
                </Col>
                :<></>
            }

            <Col xl={6} lg={12} sm={12}>
                <Card className="p-3">

                <IngredientDishesTable ingredient={ingredient}/>
                </Card>
            </Col>
            <Col sm={12}>
                <Card className="p-3">
                    <h4 className='text-center'>Калькулятор веса и себестоимости</h4>
                    <ProductsWeightsCalculator ingredient={ingredient}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientDetails;