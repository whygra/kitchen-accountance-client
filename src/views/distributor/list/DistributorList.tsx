import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Image, Row, Tooltip } from 'react-bootstrap';
import DistributorListItem from './DistributorListItem';
import { DistributorDTO, getDistributorsWithPurchaseOptions } from '../../../api/distributors';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import TooltipButton from '../../shared/TooltipButton';
import useDistributorsTableHeader from '../../../hooks/useDistributorsTableHeader';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import usePagination from '../../../hooks/usePagination';

function DistributorList() 
{
  
    const [distributors, setDistributors] = useState(new Array<DistributorDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
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
    
    const {sliceLimits, nav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Поставщики</h2>
        {
            hasPermission(UserPermissions.CRUD_DISTRIBUTORS)
            ? <Link to={'/distributors/create'}>
                <TooltipButton variant='success' tooltip='создать'>
                    Создать
                </TooltipButton>
            </Link>
            : <></>
        }
        </div>
        <hr/>
            {header}
        <Accordion>
            {filtered.slice(sliceLimits.start, sliceLimits.end).map(d=>
                <DistributorListItem onDelete={async()=>{await loadDistributors()}} distributor={d}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default DistributorList;