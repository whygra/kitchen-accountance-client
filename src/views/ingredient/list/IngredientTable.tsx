import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Image, Row, Table } from 'react-bootstrap';
import { IngredientDTO, IngredientTypeDTO, getIngredientsWithProducts } from '../../../api/ingredients';
import IngredientListItem from './IngredientListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import usePagination from '../../../hooks/usePagination';
import { getIngredientTypes } from '../../../api/ingredientTypes';
import TooltipButton from '../../shared/TooltipButton';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import IngredientsTableItem from './IngredientsTableItem';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';

interface IngredientTableProps {
    ingredients: IngredientDTO[]
    fieldsToExclude: IngredientField[]
}

function IngredientsTable({ingredients, fieldsToExclude}:IngredientTableProps) 
{
    const {header, getComparer, getPredicate} = useIngredientsTableHeader(
        [{id: 0, name: 'ГП'},{id: 0, name: 'ПФ'}], 
        false, 
        fieldsToExclude
    )
    
    const filtered = ingredients
        ?.filter(getPredicate())
        .sort(getComparer())
    
    const {sliceLimits, nav} = usePagination(filtered.length);

    return (
        <>
            {header}
            {   
                filtered
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=>
                        <div className='pe-5 border-bottom'>
                            <IngredientsTableItem 
                                ingredient={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </div>
                    )
            }
        {nav}
        </>
    )
}

export default IngredientsTable;