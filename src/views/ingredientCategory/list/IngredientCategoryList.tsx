import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import IngredientCategoryListItem from './IngredientCategoryListItem';
import { getIngredientCategoriesWithIngredients, IngredientCategoryDTO } from '../../../api/ingredientCategories';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useIngredientCategoriesTableHeader from '../../../hooks/useIngredientCategoriesTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function IngredientCategoryList() 
{
  
    const [ingredientCategories, setIngredientCategories] = useState(new Array<IngredientCategoryDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [ingredientCategories])
  
    async function loadIngredientCategories() {
        setIsLoading(true)    
        try{
          const res = await getIngredientCategoriesWithIngredients()
          setIngredientCategories(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadIngredientCategories()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useIngredientCategoriesTableHeader()

    const filtered = ingredientCategories
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Категории ингредиентов</h2>
        {
            hasPermission(UserPermissions.CRUD_INGREDIENTS)
            ? <Link to={'/ingredient-categories/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <div className='w-100 ps-3'>{header}</div>
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <IngredientCategoryListItem ingredientCategory={c} onDelete={async()=>{await loadIngredientCategories()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default IngredientCategoryList;