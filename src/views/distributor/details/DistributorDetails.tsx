import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetDistributorWithPurchaseOptionsDTO, getDistributorWithPurchaseOptions } from '../../../api/distributors';
import DistributorPurchaseOptionsTable from './PurchaseOptionsTable';
import PurchaseOptionsTable from './PurchaseOptionsTable';


function DistributorDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [distributor, setDistributor] = useState<GetDistributorWithPurchaseOptionsDTO|null>(null)
    
    const {id} = useParams()

    useEffect(()=>{loadDistributor()}, [])

    async function loadDistributor() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id поставщика")
        
        setIsLoading(true)
        const distributor = await getDistributorWithPurchaseOptions(parseInt(id??'0'))
        
        if (distributor === null)
            throw Error("Не удалось получить данные о поставщике")
        
        setDistributor(distributor)
        setIsLoading(false)
    }

    return isLoading ? (<>Loading...</>) : 
           distributor===null ? (<>Не удалось получить данные поставщика</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${distributor.id}. ${distributor.name}`}</h3>
            
            <div className='d-flex justify-content-end'>
                <Link to={`/distributors/edit/${distributor.id}`}><small>Редактировать...</small></Link>
            </div>
            <Col lg={6} md={12} sm={12}>
                
                <Card className="p-3">

                <PurchaseOptionsTable distributor={distributor}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DistributorDetails;