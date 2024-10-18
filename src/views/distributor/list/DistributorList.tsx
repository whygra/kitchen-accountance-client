import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Image, Row, Tooltip } from 'react-bootstrap';
import DistributorListItem from './DistributorListItem';
import { DistributorDTO, getDistributorsWithPurchaseOptions } from '../../../api/distributors';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import PaginationNav from '../../shared/PaginationNav';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import TooltipButton from '../../shared/TooltipButton';
import useDistributorsTableHeader from '../../../hooks/useDistributorsTableHeader';
import Loading from '../../shared/Loading';

function DistributorList() 
{
  
    const [distributors, setDistributors] = useState(new Array<DistributorDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(authContext)
    const {showModal} = useContext(appContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadDistributors() {
      setIsLoading(true)    
      try{
        const res = await getDistributorsWithPurchaseOptions()
        setDistributors(res ?? [])
      }
      catch (error: Error | any) {
        showBoundary(error)
      }
      finally{
          setIsLoading(false)
      }
    }

    useEffect(()=>{loadDistributors()},[])

    useEffect(()=>{
        document.title = "Поставщики"}
    , [distributors])
    
    const {header, getComparer, getPredicate} = useDistributorsTableHeader()
    
    const filtered = distributors
        .filter(getPredicate())
        .sort(getComparer())
    
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }
  
    return isLoading ? (<Loading/>) : (
        <>
        {
            hasPermission(UserPermissions.CRUD_DISTRIBUTORS)
            ? <Link to={'/distributors/create'}>
                <TooltipButton variant='success' tooltip='создать'>
                    Создать
                </TooltipButton>
            </Link>
            : <></>
        }
        <Row className='ps-1'>
            {header}
        </Row>
        <Accordion>
            {filtered.slice(sliceLimits.start, sliceLimits.end).map(d=>
                <DistributorListItem onDelete={async()=>{await loadDistributors()}} distributor={d}/>
            )}
        </Accordion>
        <PaginationNav initPageLength={5} makeSlice={makeSlice} totalLength={distributors.length}/>
        </>
    )
}

export default DistributorList;