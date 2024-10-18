import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import DishListItem from './DishListItem';
import { DishDTO, getDishesWithPurchaseOptions, getDishWithPurchaseOptions } from '../../../api/dishes';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';

function DishList() 
{
  
    const [dishes, setDishes] = useState(new Array<DishDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(authContext)

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
    const {getComparer, getPredicate, header} = useDishesTableHeader()

    const filtered = dishes
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, paginationNav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        {
            hasPermission(UserPermissions.CRUD_DISHES)
            ? <Link to={'/dishes/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        <div className='w-100 ps-3'>{header}</div>
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(d=>
                <DishListItem dish={d} onDelete={async()=>{await loadDishes()}}/>
            )}
        </Accordion>
        {paginationNav}
        </>
    )
}

export default DishList;