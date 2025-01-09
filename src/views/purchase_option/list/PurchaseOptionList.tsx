import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import PurchaseOptionListItem from './PurchaseOptionListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import { getPurchaseOptions, getPurchaseOptionsWithProducts, PurchaseOptionDTO } from '../../../api/purchaseOptions';
import TooltipButton from '../../shared/TooltipButton';
import HeaderSortButton from '../../shared/HeaderSortButton';
import useFilterPurchaseOptions from '../../../hooks/filter/useFilterPurchaseOptions';
import useSortPurchaseOptions, { PurchaseOptionField } from '../../../hooks/sort/useSortPurchaseOptions';
import PurchaseOptionsTableHeader from '../table/PurchaseOptionsTableHeader';
import usePurchaseOptionsTableHeader from '../../../hooks/usePurchaseOptionsTableHeader';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import usePagination from '../../../hooks/usePagination';
    
function PurchaseOptionList() 
{
    const [purchaseOptions, setPurchaseOptions] = useState(new Array<PurchaseOptionDTO>)

    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()
    const {hasPermission} = useContext(projectContext)
    
    async function loadPurchaseOptions() {
        setIsLoading(true)    
        try{
            const res = await getPurchaseOptionsWithProducts()
            setPurchaseOptions(res ?? [])
        }
        catch (error: Error | any) {
            showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{loadPurchaseOptions()},[])

    useEffect(()=>{
        document.title = "Позиции закупки"}
    , [purchaseOptions])

    
    const {getComparer, getPredicate, header} = usePurchaseOptionsTableHeader(false)
    
    const filtered = purchaseOptions
    ?.filter(getPredicate())
    .sort(getComparer())

    const {nav, sliceLimits} = usePagination(filtered.length)
    
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Позиции закупки</h2>
        {
            hasPermission(UserPermissions.CRUD_DISTRIBUTORS)
            ? <Link to={'/purchase-options/create'}>
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
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(o=>
                <PurchaseOptionListItem purchaseOption={o} onDelete={async()=>{await loadPurchaseOptions()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default PurchaseOptionList;