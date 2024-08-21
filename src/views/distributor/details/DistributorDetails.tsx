import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DistributorWithPurchaseOptionsDTO as DistributorWithPurchaseOptionsDTO, getDistributorWithPurchaseOptions } from '../../../api/distributors';
import DistributorPurchaseOptionsTable from './PurchaseOptionsTable';
import PurchaseOptionsTable from './PurchaseOptionsTable';
import { getIngredientWithProducts } from '../../../api/ingredients';
import { appContext } from '../../../context/AppContextProvider';


function DistributorDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [distributor, setDistributor] = useState<DistributorWithPurchaseOptionsDTO|null>(null)
    
    const {id} = useParams()

    const {showModal} = useContext(appContext)

    useEffect(()=>{loadDistributor()}, [])

    async function loadDistributor() {
        try{

            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id поставщика")
            
            setIsLoading(true)
            const res = await getDistributorWithPurchaseOptions(parseInt(id??'0'))
            
            if (res === null)
                throw Error("Не удалось получить данные о поставщике")
            
            setDistributor(res)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    return isLoading ? (<>Loading...</>) : 
           distributor===null ? (<>Не удалось получить данные поставщика</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${distributor.id}. ${distributor.name}`}</h3>
            
            <div className='d-flex justify-content-end'>
                <Link to={`/distributors/edit/${distributor.id}`}><small>Редактировать...</small></Link>
            </div>
            <Col xl={6} lg={12} md={12} sm={12}>
                
                <Card className="p-3">

                <PurchaseOptionsTable distributor={distributor}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DistributorDetails;