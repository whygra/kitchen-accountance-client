import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { GetComponentProductDTO, GetComponentWithProductsDTO, getComponentWithProducts } from '../../../api/componentWithProducts';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductsWeightsCalculator from './ProductsWeightsCalculator';
import ComponentProductsTable from './ComponentProductsTable';


function ComponentDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [component, setComponent] = useState<GetComponentWithProductsDTO|null>(null)
    
    const {id} = useParams()

    useEffect(()=>{loadComponent()}, [])

    async function loadComponent() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id компонента")
        
        setIsLoading(true)
        const component = await getComponentWithProducts(parseInt(id??'0'))
        
        if (component === null)
            throw Error("Не удалось получить данные о компоненте")
        
        setComponent(component)
        setIsLoading(false)
    }

    return isLoading ? (<>Loading...</>) : 
           component===null ? (<>Не удалось получить компонент</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${component.id}. ${component.name} ${component.type.name}`}</h3>
            <div className='d-flex justify-content-end'>
                <Link to={`/components/edit/${component.id}`}><small>Редактировать...</small></Link>
            </div>
            <Col lg={6} md={12} sm={12}>
                <Card className="p-3">

                <ComponentProductsTable component={component}/>
                </Card>
            </Col>
            <Col lg={6} md={12} sm={12}>
                <Card className="p-3">

                <ProductsWeightsCalculator component={component}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default ComponentDetails;