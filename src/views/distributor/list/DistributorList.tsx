import { useEffect, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import DistributorListItem from './DistributorListItem';
import { GetDistributorWithPurchaseOptionsDTO, getDistributorsWithPurchaseOptions } from '../../../api/distributors';
import { Link } from 'react-router-dom';

function DistributorList() 
{
  
    const [distributors, setDistributors] = useState(new Array<GetDistributorWithPurchaseOptionsDTO>)
    const [isLoading, setIsLoading] = useState(false)
  
    async function loadDistributors() {
      setIsLoading(true)
      const loaded = await getDistributorsWithPurchaseOptions()
      // TODO: if loaded === null
      setDistributors(loaded ?? [])
      setIsLoading(false)
    }

    useEffect(()=>{loadDistributors()},[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Link to={'/distributors/create'}>Создать</Link>
        <Row className='ps-3 pe-5'>
            <Col md={2} sm={2} className='text-end'><b>id</b></Col>
            <Col md={10} sm={10} className='text-center'><b>Наименование</b></Col>
        </Row>
        <Accordion>
            {distributors.map(d=>
                <DistributorListItem onDelete={async()=>{await loadDistributors()}} distributor={d}/>
            )}
        </Accordion>
        </>
    )
}

export default DistributorList;