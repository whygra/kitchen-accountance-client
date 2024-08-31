import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import DishListItem from './DishListItem';
import { DishWithIngredientsDTO, getDishesWithIngredients } from '../../../api/dishes';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';

function DishList() 
{
  
    const [dishes, setDishes] = useState(new Array<DishWithIngredientsDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {showModal} = useContext(appContext)
  
    async function loadDishes() {
        setIsLoading(true)    
        try{
          const res = await getDishesWithIngredients()
          setDishes(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
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
                <DishListItem dish={d} onDelete={async()=>{await loadDishes()}}/>
            )}
        </Accordion>
        </>
    )
}

export default DishList;