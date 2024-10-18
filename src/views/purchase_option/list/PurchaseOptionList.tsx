import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import PurchaseOptionListItem from './PurchaseOptionListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import PaginationNav from '../../shared/PaginationNav';
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
    
function PurchaseOptionList() 
{
    const [purchaseOptions, setPurchaseOptions] = useState(new Array<PurchaseOptionDTO>)

    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()
    const {hasPermission} = useContext(authContext)
    
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

    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }

    const {getComparer, getPredicate, header} = usePurchaseOptionsTableHeader(false, [PurchaseOptionField.Product])

    const filtered = purchaseOptions
    ?.filter(getPredicate())
    .sort(getComparer())
  
    return isLoading ? (<Loading/>) : (
        <>
        {
            hasPermission(UserPermissions.CRUD_DISTRIBUTORS)
            ? <Link to={'/purchase-options/create'}>
                <TooltipButton variant='success' tooltip='создать'>
                    Создать
                </TooltipButton>
            </Link>
            : <></>
        }
        <Table>{header}</Table>

        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(o=>
                <PurchaseOptionListItem purchaseOption={o} onDelete={async()=>{await loadPurchaseOptions()}}/>
            )}
        </Accordion>
        <PaginationNav
            makeSlice={makeSlice}
            initPageLength={5}
            totalLength={filtered.length}
        />
        </>
    )
}

export default PurchaseOptionList;