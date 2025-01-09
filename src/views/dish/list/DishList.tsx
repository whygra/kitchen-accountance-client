import { useContext, useEffect, useRef, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import DishListItem from './DishListItem';
import { DishDTO, getDishesWithPurchaseOptions, getDishWithPurchaseOptions } from '../../../api/dishes';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import { DishField } from '../../../hooks/sort/useSortDishes';

function DishList() 
{
  
    const [dishes, setDishes] = useState(new Array<DishDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Блюда"}
    , [dishes])
  
    async function loadDishes() {
        setIsLoading(true)    
        try{
          const res = await getDishesWithPurchaseOptions()
          setDishes(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadDishes()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useDishesTableHeader(false, [DishField.Id])

    const filtered = dishes
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Блюда</h2>
        {
            hasPermission(UserPermissions.CRUD_DISHES)
            ? <Link to={'/dishes/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}

        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(d=>
                <DishListItem dish={d} onDelete={async()=>{await loadDishes()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default DishList;