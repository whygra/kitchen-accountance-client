import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DishWithIngredientsDTO, getDishWithIngredients, getDishWithPurchaseOptions } from '../../../api/dishes';
import DishIngredientsTable from './DishIngredientsTable';
import IngredientsWeightsCalculator from './IngredientsWeightsCalculator';
import DishWeight from './DishWeight';
import DishCostCalculator from './DishCostCalculator';
import DishCostCalculatorContextProvider from '../../../context/DishCostCalculatorContext';


function DishDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dish, setDish] = useState<DishWithIngredientsDTO|null>(null)
    
    const {id} = useParams()

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

    return isLoading ? (<>Loading...</>) : 
           dish===null ? (<>Не удалось получить блюдо</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${dish.id}. ${dish.name}`}</h3>
            <h5 className='text-center'>Вес блюда: <DishWeight dish={dish}/> г.</h5>
            
            <div className='d-flex justify-content-end'>
                <Link to={`/dishes/edit/${dish.id}`}><small>Редактировать...</small></Link>
            </div>
            <Col lg={6} md={12} sm={12}>
                
                <Card className="p-3">

                <DishIngredientsTable dish={dish}/>
                </Card>
            </Col>
            <Col lg={6} md={12} sm={12}>
                <Card className="p-3">

                <IngredientsWeightsCalculator dish={dish}/>
                </Card>
            </Col>
            <Col lg={6} md={12} sm={12}>
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