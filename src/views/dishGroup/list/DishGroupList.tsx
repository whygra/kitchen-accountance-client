import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import DishGroupListItem from './DishGroupListItem';
import { getDishGroupsWithDishes, DishGroupDTO } from '../../../api/dishGroups';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useDishGroupsTableHeader from '../../../hooks/useDishesGroupsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function DishGroupList() 
{
  
    const [DishGroups, setDishGroups] = useState(new Array<DishGroupDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Блюда"}
    , [DishGroups])
  
    async function loadDishGroups() {
        setIsLoading(true)    
        try{
          const res = await getDishGroupsWithDishes()
          setDishGroups(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadDishGroups()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useDishGroupsTableHeader()

    const filtered = DishGroups
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Группы блюд</h2>
        {
            hasPermission(UserPermissions.CRUD_DISHES)
            ? <Link to={'/dish-groups/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <div className='w-100 ps-3'>{header}</div>
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <DishGroupListItem dishGroup={c} onDelete={async()=>{await loadDishGroups()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default DishGroupList;