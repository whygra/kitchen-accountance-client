import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
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
                    <th>Id Продукта</th>
                    <th>Продукт</th>
                    <th>Доля содержания</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.products
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td>{p.id}</td>
                        <td><Link to={`/products/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.raw_content_percentage}%</td>
                        <td>{p.waste_percentage}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default IngredientProductsTable;