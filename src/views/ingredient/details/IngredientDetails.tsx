import { Accordion, Button, Card, Col, Form, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { IngredientDTO, deleteIngredient, getIngredientWithProducts, getIngredientWithPurchaseOptions } from '../../../api/ingredients';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductsWeightsCalculator from './ProductsWeightsCalculator';
import IngredientProductsTable from './IngredientProductsTable';
import { appContext } from '../../../context/AppContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import CUDButtons from '../../shared/CUDButtons';
import { calcAvgWastePercentage } from '../../../models/IngredientProductsWeightsCalculatorState';
import IngredientDishesTable from './IngredientDishesTable';
import { constructIngredientCostCalculator } from '../../../models/DishCostCalculatorState';
import IngredientCostCalculator from '../../dish/details/IngredientCostCalculator';
import Loading from '../../shared/Loading';


function IngredientDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredient, setIngredient] = useState<IngredientDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Ингредиент "${ingredient?.id}. ${ingredient?.name}"`}
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
            <div className='d-flex justify-content-between'>
            <h3 className='text-center'>{`${ingredient.id}. ${ingredient.name} ${ingredient.type.name}`}</h3>
            <CUDButtons
                deleteFn={deleteFn}
                entity={ingredient}
                path='ingredients'
                requiredPermission={UserPermissions.CRUD_INGREDIENTS}
            />   
            </div>
            <Col lg={12} sm={12}>
                <ListGroup>
                    <ListGroupItem>категория: {ingredient.category?.name ?? 'нет'}</ListGroupItem>
                    <ListGroupItem>тип: {ingredient.type.name}</ListGroupItem>
                    <ListGroupItem>средний процент отхода: {calcAvgWastePercentage(ingredient).toFixed(2)}</ListGroupItem>
                    {ingredient.is_item_measured
                        ?<ListGroupItem>вес 1шт: {ingredient.item_weight}</ListGroupItem>
                        :<></>
                    }
                </ListGroup>
            </Col>
            <Col xl={6} lg={12} sm={12}>
                <Card className="p-3">

                <IngredientProductsTable ingredient={ingredient}/>
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