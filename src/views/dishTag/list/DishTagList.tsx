import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import DishTagListItem from './DishTagListItem';
import { getDishTagsWithDishes, DishTagDTO } from '../../../api/nomenclature/dishTags';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useDishTagsTableHeader from '../../../hooks/useDishesTagsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function DishTagList() 
{
  
    const [DishTags, setDishTags] = useState(new Array<DishTagDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Блюда"}
    , [DishTags])
  
    async function loadDishTags() {
        setIsLoading(true)    
        try{
          const res = await getDishTagsWithDishes()
          setDishTags(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadDishTags()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useDishTagsTableHeader()

    const filtered = DishTags
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        
        <div className='d-flex justify-content-between'>
            <h2>Группы блюд</h2>
        {
            hasPermission(UserPermissions.CRUD_DISHES)
            ? <Link to={'/dish-tags/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion className='accordion-button-ps-1pt'>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <DishTagListItem dishTag={c} onDelete={async()=>{await loadDishTags()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default DishTagList;