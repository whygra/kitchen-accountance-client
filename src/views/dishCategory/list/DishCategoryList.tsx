import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import DishCategoryListItem from './DishCategoryListItem';
import { getDishCategoriesWithDishes, DishCategoryDTO } from '../../../api/dishCategories';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useDishCategoriesTableHeader from '../../../hooks/useDishCategoriesTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function DishCategoryList() 
{
  
    const [dishCategories, setDishCategories] = useState(new Array<DishCategoryDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [dishCategories])
  
    async function loadDishCategories() {
        setIsLoading(true)    
        try{
          const res = await getDishCategoriesWithDishes()
          setDishCategories(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadDishCategories()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useDishCategoriesTableHeader()

    const filtered = dishCategories
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Категории блюд</h2>
        {
            hasPermission(UserPermissions.CRUD_DISHES)
            ? <Link to={'/dish-categories/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <DishCategoryListItem dishCategory={c} onDelete={async()=>{await loadDishCategories()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default DishCategoryList;