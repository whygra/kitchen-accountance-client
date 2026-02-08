import { useContext, useEffect, useState } from 'react';
import { IngredientDTO, IngredientTypeDTO, getIngredientsWithProducts } from '../../../api/nomenclature/ingredients';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import usePagination from '../../../hooks/usePagination';
import IngredientsTableItem from './IngredientsTableItem';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';

interface IngredientTableProps {
    ingredients: IngredientDTO[]
    fieldsToExclude?: IngredientField[]
}

function IngredientsTable({ingredients, fieldsToExclude}:IngredientTableProps) 
{
    const {header, getComparer, getPredicate} = useIngredientsTableHeader({
        ingredientTypes:[{id: 0, name: 'ГП'},{id: 0, name: 'ПФ'}], 
        filtersOpen:false, 
        fieldsToExclude}
    )
    
    const filtered = ingredients
        ?.filter(getPredicate())
        .sort(getComparer())
    
    const {sliceLimits, nav} = usePagination(filtered.length);

    return (
        <div className='mb-3'>
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
        </div>
    )
}

export default IngredientsTable;