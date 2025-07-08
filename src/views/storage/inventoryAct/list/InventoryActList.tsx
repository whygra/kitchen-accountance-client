import { useContext, useEffect, useState } from 'react';
import { Accordion, Card, Col, Image, Row, Table } from 'react-bootstrap';
import { InventoryActDTO, getInventoryActsWithItems } from '../../../../api/storage/inventoryActs';
import InventoryActListItem from './InventoryActListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../../context/AuthContextProvider';
import { UserPermissions } from '../../../../models';
import useInventoryActsTableHeader from '../../../../hooks/useInventoryActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import TooltipButton from '../../../shared/TooltipButton';
import Loading from '../../../shared/Loading';
import { projectContext } from '../../../../context/ProjectContextProvider';

function InventoryActList() 
{
    const [inventoryActs, setInventoryActs] = useState(new Array<InventoryActDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadInventoryActs() {
        setIsLoading(true)    
        try{
          const res = await getInventoryActsWithItems()
          setInventoryActs(res ?? [])

        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadInventoryActs()},[])

    useEffect(()=>{
        document.title = "Акты инвентаризации"}
    , [inventoryActs])

    const {getComparer, getPredicate, header} = useInventoryActsTableHeader()
    
    const filtered = inventoryActs
        .filter(getPredicate())
        .sort(getComparer())
            
    const {sliceLimits, nav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Акты инвентаризации</h2>
        {
            hasPermission(UserPermissions.CRUD_STORAGE)
            ? <Link to={'/inventory-acts/create'}>
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
                <InventoryActListItem inventoryAct={c} onDelete={async()=>{await loadInventoryActs()}}/>
            )}
        </Accordion>
        {nav}

        </>
    )
}

export default InventoryActList;