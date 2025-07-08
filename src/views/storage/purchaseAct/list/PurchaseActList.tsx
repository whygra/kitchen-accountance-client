import { useContext, useEffect, useState } from 'react';
import { Accordion, Card, Col, Image, Row, Table } from 'react-bootstrap';
import { PurchaseActDTO, getPurchaseActsWithItems } from '../../../../api/storage/purchaseActs';
import PurchaseActListItem from './PurchaseActListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../../context/AuthContextProvider';
import { UserPermissions } from '../../../../models';
import usePurchaseActsTableHeader from '../../../../hooks/usePurchaseActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import TooltipButton from '../../../shared/TooltipButton';
import Loading from '../../../shared/Loading';
import { projectContext } from '../../../../context/ProjectContextProvider';

function PurchaseActList() 
{
    const [purchaseActs, setPurchaseActs] = useState(new Array<PurchaseActDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadPurchaseActs() {
        setIsLoading(true)    
        try{
          const res = await getPurchaseActsWithItems()
          setPurchaseActs(res ?? [])

        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadPurchaseActs()},[])

    useEffect(()=>{
        document.title = "Акты закупки"}
    , [purchaseActs])

    const {getComparer, getPredicate, header} = usePurchaseActsTableHeader()
    
    const filtered = purchaseActs
        .filter(getPredicate())
        .sort(getComparer())
            
    const {sliceLimits, nav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Акты закупки</h2>
        {
            hasPermission(UserPermissions.CRUD_STORAGE)
            ? <Link to={'/purchase-acts/create'}>
                <TooltipButton variant='success' tooltip='создать'>
                    Создать
                </TooltipButton>
            </Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion className='accordion-button-ps-1pt'>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <PurchaseActListItem purchaseAct={c} onDelete={async()=>{await loadPurchaseActs()}}/>
            )}
        </Accordion>
        {nav}

        </>
    )
}

export default PurchaseActList;