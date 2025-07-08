import { useContext, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { WriteOffActDTO, getWriteOffActsWithItems } from '../../../../api/storage/writeOffActs';
import WriteOffActListItem from './WriteOffActListItem';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { UserPermissions } from '../../../../models';
import useWriteOffActsTableHeader from '../../../../hooks/useInventoryActsTableHeader';
import usePagination from '../../../../hooks/usePagination';
import TooltipButton from '../../../shared/TooltipButton';
import Loading from '../../../shared/Loading';
import { projectContext } from '../../../../context/ProjectContextProvider';

function WriteOffActList() 
{
    const [writeOffActs, setWriteOffActs] = useState(new Array<WriteOffActDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(projectContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadWriteOffActs() {
        setIsLoading(true)    
        try{
          const res = await getWriteOffActsWithItems()
          setWriteOffActs(res ?? [])

        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadWriteOffActs()},[])

    useEffect(()=>{
        document.title = "Акты списания"}
    , [writeOffActs])

    const {getComparer, getPredicate, header} = useWriteOffActsTableHeader()
    
    const filtered = writeOffActs
        .filter(getPredicate())
        .sort(getComparer())
            
    const {sliceLimits, nav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Акты списания</h2>
        {
            hasPermission(UserPermissions.CRUD_STORAGE)
            ? <Link to={'/write-off-acts/create'}>
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
                <WriteOffActListItem writeOffAct={c} onDelete={async()=>{await loadWriteOffActs()}}/>
            )}
        </Accordion>
        {nav}

        </>
    )
}

export default WriteOffActList;