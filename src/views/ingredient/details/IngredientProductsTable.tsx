import { Table } from "react-bootstrap";
import { GetIngredientWithProductsDTO } from "../../../api/ingredients";

interface IngredientProductsTableProps {
    ingredient: GetIngredientWithProductsDTO
}

function IngredientProductsTable({ingredient}:IngredientProductsTableProps) {
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

                {ingredient.ingredients_products.map(c => <tr className='text-center'>
                    <td>{c.product.id}</td>
                    <td>{c.product.name}</td>
                    <td>{c.raw_content_percentage}%</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default IngredientProductsTable;