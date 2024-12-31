import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

interface IngredientDishesTableProps {
    ingredient: IngredientDTO
}

function IngredientDishesTable({ingredient}:IngredientDishesTableProps) {
        
    const {nav, sliceLimits} = usePagination(ingredient.dishes?.length??0)
    
    return(
        
        <><h4 className="text-center">Используется в блюдах</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th className="d-none d-sm-table-cell">Id Блюда</th>
                    <th>Название</th>
                    <th>{ingredient.is_item_measured?'Количество':'Вес'} ингредиента</th>
                    <th>Потери в весе</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.dishes
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(d => 
                    <tr className='text-center'>
                        <td className="d-none d-sm-table-cell">{d.id}</td>
                        <td><Link to={`/dishes/details/${d.id}`}>{d.name}</Link></td>
                        <td>{d.ingredient_amount}</td>
                        <td>{d.waste_percentage}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default IngredientDishesTable;