import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { GetIngredientWithProductsDTO } from '../../../api/ingredientWithProducts';
import { Link } from 'react-router-dom';
import IngredientProductsTable from '../details/IngredientProductsTable';


interface IngredientListItemProps {
    ingredient: GetIngredientWithProductsDTO
  }

function IngredientListItem({ingredient}: IngredientListItemProps) 
{   
    return (
        <>
        <Accordion.Item eventKey={`${ingredient.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={2} sm={2} className='text-end'>{ingredient.id}</Col>
                <Col md={8} sm={8} className='text-center'>{ingredient.name}</Col>
                <Col md={2} sm={2} className='text-center'>{ingredient.type.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><IngredientProductsTable ingredient={ingredient}/></small>

                <div className='d-flex justify-content-between'>
                    <Link to={`/ingredients/edit/${ingredient.id}`}>Редактировать...</Link>
                    <Link to={`/ingredients/details/${ingredient.id}`}>Подробнее...</Link>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientListItem;