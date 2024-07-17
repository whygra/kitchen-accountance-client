import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { GetComponentWithProductsDTO } from '../../../api/componentWithProducts';
import { Link } from 'react-router-dom';
import ComponentProductsTable from '../details/ComponentProductsTable';


interface ComponentListItemProps {
    component: GetComponentWithProductsDTO
  }

function ComponentListItem({component}: ComponentListItemProps) 
{   
    return (
        <>
        <Accordion.Item eventKey={`${component.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={2} sm={2} className='text-end'>{component.id}</Col>
                <Col md={8} sm={8} className='text-center'>{component.name}</Col>
                <Col md={2} sm={2} className='text-center'>{component.type.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><ComponentProductsTable component={component}/></small>

                <div className='d-flex justify-content-between'>
                    <Link to={`/components/edit/${component.id}`}>Редактировать...</Link>
                    <Link to={`/components/details/${component.id}`}>Подробнее...</Link>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default ComponentListItem;