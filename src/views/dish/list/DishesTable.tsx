import { DishDTO, getDishesWithIngredients } from '../../../api/dishes';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import usePagination from '../../../hooks/usePagination';
import DishesTableItem from './DishesTableItem';
import { DishField } from '../../../hooks/sort/useSortDishes';

interface DishTableProps {
    dishes: DishDTO[]
    fieldsToExclude: DishField[]
}

function DishesTable({dishes, fieldsToExclude}:DishTableProps) 
{
    const {header, getComparer, getPredicate} = useDishesTableHeader(
        false, 
        fieldsToExclude
    )
    
    const filtered = dishes
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
                            <DishesTableItem 
                                dish={i}
                                fieldsToExclude={fieldsToExclude}
                                />
                        </div>
                    )
            }
        {nav}
        </div>
    )
}

export default DishesTable;