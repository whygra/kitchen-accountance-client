import { useContext, useEffect, useState } from 'react';
import { Accordion, Card, Col, Image, Row, Table } from 'react-bootstrap';
import { SaleActDTO, getSaleActsWithItems } from '../../../../api/storage/saleActs';
import SaleActListItem from './SaleActListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../../context/AuthContextProvider';
import { UserPermissions } from '../../../../models';
import useSaleActsTableHeader from '../../../../hooks/useSaleActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import TooltipButton from '../../../shared/TooltipButton';
import Loading from '../../../shared/Loading';
import { projectContext } from '../../../../context/ProjectContextProvider';

function SaleActList() 
{
    const [saleActs, setSaleActs] = useState(new Array<SaleActDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadSaleActs() {
        setIsLoading(true)    
        try{
          const res = await getSaleActsWithItems()
          setSaleActs(res ?? [])

        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadSaleActs()},[])

    useEffect(()=>{
        document.title = "Акты продажи"}
    , [saleActs])

    const {getComparer, getPredicate, header} = useSaleActsTableHeader()
    
    const filtered = saleActs
        .filter(getPredicate())
        .sort(getComparer())
            
    const {sliceLimits, nav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Акты продажи</h2>
        {
            hasPermission(UserPermissions.CRUD_STORAGE)
            ? <Link to={'/sale-acts/create'}>
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
                <SaleActListItem saleAct={c} onDelete={async()=>{await loadSaleActs()}}/>
            )}
        </Accordion>
        {nav}

        </>
    )
}

export default SaleActList;