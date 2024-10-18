import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Image, Row, Table } from 'react-bootstrap';
import { IngredientDTO, IngredientTypeDTO, getIngredientsWithProducts } from '../../../api/ingredients';
import IngredientListItem from './IngredientListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import PaginationNav from '../../shared/PaginationNav';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import usePagination from '../../../hooks/usePagination';
import { getIngredientTypes } from '../../../api/ingredientTypes';
import TooltipButton from '../../shared/TooltipButton';
import Loading from '../../shared/Loading';

function IngredientList() 
{
    const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([])
    const [ingredients, setIngredients] = useState(new Array<IngredientDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {hasPermission} = useContext(authContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadIngredients() {
        setIsLoading(true)    
        try{
          const res = await getIngredientsWithProducts()
          setIngredients(res ?? [])

          const types = await getIngredientTypes()
          setIngredientTypes(types ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadIngredients()},[])

    useEffect(()=>{
        document.title = "Ингредиенты"}
    , [ingredients])

    const {getComparer, getPredicate, header} = useIngredientsTableHeader(ingredientTypes)
    
    const filtered = ingredients
        .filter(getPredicate())
        .sort(getComparer())
            
    const {sliceLimits, paginationNav} = usePagination(filtered.length)
  
    return isLoading ? (<Loading/>) : (
        <>
        {
            hasPermission(UserPermissions.CRUD_INGREDIENTS)
            ? <Link to={'/ingredients/create'}>
                <TooltipButton variant='success' tooltip='создать'>
                    Создать
                </TooltipButton>
            </Link>
            : <></>
        }
        <p className='ps-3'>{header}</p>
        <Accordion>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(c=>
                <IngredientListItem ingredient={c} onDelete={async()=>{await loadIngredients()}}/>
            )}
        </Accordion>
        {paginationNav}
        </>
    )
}

export default IngredientList;