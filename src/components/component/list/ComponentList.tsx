import { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { GetComponentWithProductsDTO, getComponentsWithProducts } from '../../../api/componentWithProducts';
import ComponentListItem from './ComponentListItem';
import { Link } from 'react-router-dom';

function ComponentList() 
{
  
    const [components, setComponents] = useState(new Array<GetComponentWithProductsDTO>)
    const [isLoading, setIsLoading] = useState(false)
  
    async function loadComponents() {
      setIsLoading(true)
      const loaded = await getComponentsWithProducts()
      // TODO: if loaded === null
      setComponents(loaded ?? [])
      setIsLoading(false)
    }

    useEffect(()=>{loadComponents()},[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Link to={'/components/create'}>Создать</Link>
        <Row className='ps-3 pe-5'>
            <Col md={2} sm={2} className='text-end'><b>id</b></Col>
            <Col md={8} sm={8} className='text-center'><b>Название ингредиента</b></Col>
            <Col md={2} sm={2} className='text-center'><b>Тип</b></Col>
        </Row>
        <Accordion>
            {components.map(c=>
                <ComponentListItem component={c}/>
            )}
        </Accordion>
        </>
    )
}

export default ComponentList;