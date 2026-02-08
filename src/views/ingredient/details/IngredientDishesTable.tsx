import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/nomenclature/ingredients";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

interface IngredientDishesTableProps {
    ingredient: IngredientDTO
}

function IngredientDishesTable({ingredient}:IngredientDishesTableProps) {
        console.log(ingredient)
    const {nav, sliceLimits} = usePagination(ingredient.dishes?.length??0)
    
    return(
        
        <><h4 className="text-center">Используется в блюдах</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Название</th>
                    <th>Брутто</th>
                    <th>Нетто</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.dishes
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(d => 
                    <tr className='text-center'>
                        <td><Link to={`/dishes/details/${d.id}`}>{d.name}</Link></td>
                        <td>{d.amount}{ingredient.is_item_measured?`шт*${ingredient.item_weight}г.`:'г.'}</td>
                        <td>{d.net_weight}г.</td>
                        <td>{((d.net_weight??1)/((ingredient.item_weight??0)*(d.amount??0))*100).toFixed(0)}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default IngredientDishesTable;