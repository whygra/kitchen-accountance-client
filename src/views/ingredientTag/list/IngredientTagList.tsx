import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import IngredientTagListItem from './IngredientTagListItem';
import { getIngredientTagsWithIngredients, IngredientTagDTO } from '../../../api/nomenclature/ingredientTags';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useIngredientTagsTableHeader from '../../../hooks/useIngredientTagsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function IngredientTagList() 
{
  
    const [ingredientTags, setIngredientTags] = useState(new Array<IngredientTagDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [ingredientTags])
  
    async function loadIngredientTags() {
        setIsLoading(true)    
        try{
          const res = await getIngredientTagsWithIngredients()
          setIngredientTags(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadIngredientTags()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useIngredientTagsTableHeader()

    const filtered = ingredientTags
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Группы ингредиентов</h2>
        {
            hasPermission(UserPermissions.CRUD_INGREDIENTS)
            ? <Link to={'/ingredient-tags/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion className='accordion-button-ps-1pt'>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <IngredientTagListItem ingredientTag={c} onDelete={async()=>{await loadIngredientTags()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default IngredientTagList;