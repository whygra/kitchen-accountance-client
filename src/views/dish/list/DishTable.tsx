import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Image, Row, Table } from 'react-bootstrap';
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
        <>
        <Table className='text-center'>
            {header}
            <tbody>
            {   
                filtered
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=>
                        <tr>
                            <DishesTableItem 
                                dish={i}
                                fieldsToExclude={fieldsToExclude}
                            />
                        </tr>
                    )
            }
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default DishesTable;