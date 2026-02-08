import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/nomenclature/ingredients";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

interface IngredientProductsTableProps {
    ingredient: IngredientDTO
}

function IngredientIngredientsTable({ingredient}:IngredientProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(ingredient.ingredients?.length??0)

    return(
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr className='text-center'>
                    <th>Ингредиент</th>
                    <th>Количество/Брутто</th>
                    <th>Нетто</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.ingredients
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(i => 
                    <tr className='text-center'>
                        <td><Link to={`/ingredients/details/${i.id}`}>{i.name}</Link></td>
                        <td>{((i.amount ?? 0)*(i.item_weight ?? 1)).toFixed(0)}г.</td>
                        <td>{i.is_item_measured ? `${i.item_weight}г. * ${i.amount}шт` : `${i.net_weight?.toFixed(0)}г.`}</td>
                        <td>{i.waste_percentage?.toFixed(0)}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default IngredientIngredientsTable;