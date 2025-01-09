import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row } from 'react-bootstrap';
import IngredientGroupListItem from './IngredientGroupListItem';
import { getIngredientGroupsWithIngredients, IngredientGroupDTO } from '../../../api/ingredientGroups';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useIngredientGroupsTableHeader from '../../../hooks/useIngredientGroupsTableHeader';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function IngredientGroupList() 
{
  
    const [ingredientGroups, setIngredientGroups] = useState(new Array<IngredientGroupDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Категории ингредиентов"}
    , [ingredientGroups])
  
    async function loadIngredientGroups() {
        setIsLoading(true)    
        try{
          const res = await getIngredientGroupsWithIngredients()
          setIngredientGroups(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadIngredientGroups()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useIngredientGroupsTableHeader()

    const filtered = ingredientGroups
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Группы ингредиентов</h2>
        {
            hasPermission(UserPermissions.CRUD_INGREDIENTS)
            ? <Link to={'/ingredient-groups/create'}><Button variant='success'>Создать</Button></Link>
            : <></>
        }
        </div>
        <hr/>
        {header}
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <IngredientGroupListItem ingredientGroup={c} onDelete={async()=>{await loadIngredientGroups()}}/>
            )}
        </Accordion>
        {nav}
        </>
    )
}

export default IngredientGroupList;