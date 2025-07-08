import { Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDish, DishDTO, getDishWithIngredients } from '../../../api/nomenclature/dishes';
import DishIngredientsTable from './DishIngredientsTable';
import IngredientsWeightsCalculator from './IngredientsWeightsCalculator';
import DishCostCalculator from './DishCostCalculator';
import DishCostCalculatorContextProvider from '../../../context/DishCostCalculatorContext';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import UpdatedAt from '../../shared/UpdatedAt';
import Markdown from 'react-markdown';


function DishDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dish, setDish] = useState<DishDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Блюдо "${dish?.name}"`}
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

    return isLoading ? (<Loading/>) : 
           dish===null ? (<>Не удалось получить блюдо</>) : (
        <>
            <Row className='mt-5'>

                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={dish}
                        path='dishes'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{dish.name}</h3>
                </Row>
                
                <Col md={12} lg={6}>
                    <UpdatedAt entity={dish}/>
                <ul className='list-group ps-2'>
                    <li className='list-group-item'>Вес блюда: {dish.total_net_weight?.toFixed(2)} г.</li>
                    <li className='list-group-item'>
                        Категория: "{dish.category?.name 
                            ? <Link to={`/dish-categories/details/${dish.category.id}`}>{dish.category.name}</Link> 
                            : '-без категории-'}"</li>
                    <li className='list-group-item'>
                        Группа: "{dish.group?.name 
                            ? <Link to={`/dish-groups/details/${dish.group.id}`}>{dish.group.name}</Link> 
                            : '-без группы-'}"</li>
                </ul>
                </Col>
            <Col md={12} lg={6}>
                
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
                    style={{maxHeight:'20em'}} 
                        className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                        >
                        <Image  style={{maxHeight:'20em', maxWidth:'100%'}} src={`${dish.image?.url}`}/>
                    </div>
                }
                </Card>
            </Col>
            <Col md={12} lg={6}>
                
                <Card className="p-3">

                <DishIngredientsTable dish={dish}/>
                {dish.description
                    ?
                    <p className='border-y bg-light p-3'>
                        <h5>Описание</h5>
                        <Markdown>
                            {dish.description}
                        </Markdown>
                    </p>
                    : <></>
                }
                </Card>
            </Col>
            <Col md={12} lg={6}>
                <Card className="p-3">

                <IngredientsWeightsCalculator dish={dish}/>
                </Card>
            </Col>
            <Col lg={12}>
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