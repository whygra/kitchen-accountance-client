import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDish, DishDTO, getDishWithIngredients, getDishWithPurchaseOptions } from '../../../api/dishes';
import DishIngredientsTable from './DishIngredientsTable';
import IngredientsWeightsCalculator from './IngredientsWeightsCalculator';
import DishWeight from './DishWeight';
import DishCostCalculator from './DishCostCalculator';
import DishCostCalculatorContextProvider from '../../../context/DishCostCalculatorContext';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';


function DishDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dish, setDish] = useState<DishDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Блюдо "${dish?.id}. ${dish?.name}"`}
    , [dish])

    useEffect(()=>{loadDish()}, [])

    async function loadDish() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id блюда")
        
        setIsLoading(true)
        const dish = await getDishWithIngredients(parseInt(id??'0'))
        
        if (dish === null)
            throw Error("Не удалось получить данные о блюде")
        
        setDish(dish)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteDish(id)
        navigate('/dishes/all')
    }
    console.log(dish?.image)

    return isLoading ? (<Loading/>) : 
           dish===null ? (<>Не удалось получить блюдо</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${dish.id}. ${dish.name}`}</h3>
            <h5 className='text-center'>Вес блюда: <DishWeight dish={dish}/> г.</h5>
            
            <CUDButtons
                deleteFn={deleteFn}
                entity={dish}
                path='dishes'
                requiredPermission={UserPermissions.CRUD_DISHES}
            />
            <Col md={12} lg={12}>
                
                <Card 
                    className="p-3"
                >
                {
                    (dish.image?.url ?? '') == ''
                    ? <div 
                    style={{minHeight: '200px', minWidth: '100px'}} 
                        className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                        >
                        <h3>Нет изображения</h3>
                    </div>
                    : <div 
                    style={{height:'20em'}} 
                        className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                        >
                        <Image  style={{maxHeight:'100%', maxWidth:'100%'}} src={`${dish.image?.url}`}/>
                    </div>
                }
                </Card>
            </Col>
            <Col md={12} lg={6}>
                
                <Card className="p-3">

                <DishIngredientsTable dish={dish}/>
                </Card>
            </Col>
            <Col md={12} lg={6}>
                <Card className="p-3">

                <IngredientsWeightsCalculator dish={dish}/>
                </Card>
            </Col>
            <Col md={12} lg={6}>
                <Card className="p-3">
                <DishCostCalculatorContextProvider id={dish.id}>
                    <DishCostCalculator/>
                </DishCostCalculatorContextProvider>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DishDetails;