import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import DistributorListItem from './DistributorListItem';
import { DistributorWithPurchaseOptionsDTO, getDistributorsWithPurchaseOptions } from '../../../api/distributors';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';

function DistributorList() 
{
  
    const [distributors, setDistributors] = useState(new Array<DistributorWithPurchaseOptionsDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {showModal} = useContext(appContext)
  
    async function loadDistributors() {
      setIsLoading(true)    
      try{
        const res = await getDistributorsWithPurchaseOptions()
        setDistributors(res ?? [])
      }
      catch (error: Error | any) {
        showModal(<>{error?.message}</>)
      }
      finally{
          setIsLoading(false)
      }
    }

    useEffect(()=>{loadDistributors()},[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Link to={'/distributors/create'}>Создать</Link>
        <Row className='ps-3 pe-5'>
            <Col xs={2} className='text-end'><b>id</b></Col>
            <Col xs={10} className='text-center'><b>Наименование</b></Col>
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