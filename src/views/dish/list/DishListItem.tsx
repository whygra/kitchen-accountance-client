import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetDishWithIngredientsDTO } from '../../../api/dishWithIngredients';
import DishIngredientsTable from '../details/DishIngredientsTable';
import DishWeight from '../details/DishWeight';


interface DishListItemProps {
    dish: GetDishWithIngredientsDTO
  }

function DishListItem({dish}: DishListItemProps) 
{   
    return (
        <>
        <Accordion.Item eventKey={`${dish.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={2} sm={2} className='text-end'>{dish.id}</Col>
                <Col md={8} sm={8} className='text-center'>{dish.name}</Col>
                <Col md={2} sm={2} className='text-center'><DishWeight dish={dish}/></Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><DishIngredientsTable dish={dish}/></small>

                <div className='d-flex justify-content-between'>
                    <Link to={`/dishes/edit/${dish.id}`}>Редактировать...</Link>
                    <Link to={`/dishes/details/${dish.id}`}>Подробнее...</Link>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishListItem;