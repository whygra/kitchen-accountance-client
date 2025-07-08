import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/nomenclature/ingredients";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

interface IngredientProductsTableProps {
    ingredient: IngredientDTO
}

function IngredientProductsTable({ingredient}:IngredientProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(ingredient.products?.length??0)

    return(
        <><h4 className="text-center">Продукты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Продукт</th>
                    <th>Брутто</th>
                    <th>Нетто</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.products
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/products/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.gross_weight?.toFixed(0)}г.</td>
                        <td>{p.net_weight?.toFixed(0)}г.</td>
                        <td>{p.waste_percentage?.toFixed(0)}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default IngredientProductsTable;