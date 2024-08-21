import { Table } from "react-bootstrap";
import { IngredientWithProductsDTO } from "../../../api/ingredients";

interface IngredientProductsTableProps {
    ingredient: IngredientWithProductsDTO
}

function IngredientProductsTable({ingredient}:IngredientProductsTableProps) {
    console.log(ingredient.products)
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

                {ingredient.products.map(p => <tr className='text-center'>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.raw_content_percentage}%</td>
                    <td>{p.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default IngredientProductsTable;