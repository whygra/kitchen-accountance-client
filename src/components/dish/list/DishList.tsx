import { useEffect, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import DishListItem from './DishListItem';
import { GetDishWithComponentsDTO, getDishesWithComponents } from '../../../api/dishWithComponents';
import { Link } from 'react-router-dom';

function DishList() 
{
  
    const [dishes, setDishes] = useState(new Array<GetDishWithComponentsDTO>)
    const [isLoading, setIsLoading] = useState(false)
  
    async function loadDishes() {
      setIsLoading(true)
      const loaded = await getDishesWithComponents()
      // TODO: if loaded === null
      setDishes(loaded ?? [])
      setIsLoading(false)
    }

    useEffect(()=>{loadDishes()},[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Link to={'/dishes/create'}>Создать</Link>
        <Row className='ps-3 pe-5'>
            <Col md={2} sm={2} className='text-end'><b>id</b></Col>
            <Col md={8} sm={8} className='text-center'><b>Название Блюда</b></Col>
            <Col md={2} sm={2} className='text-center'><b>Вес Блюда</b></Col>
        </Row>
        <Accordion>
            {dishes.map(d=>
                <DishListItem dish={d}/>
            )}
        </Accordion>
        </>
    )
}

export default DishList;