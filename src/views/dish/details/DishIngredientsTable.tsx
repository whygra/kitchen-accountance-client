import { Table } from "react-bootstrap";
import { GetDishWithIngredientsDTO } from "../../../api/dishWithIngredients";

interface DishIngredientsTableProps {
    dish: GetDishWithIngredientsDTO
}

function DishIngredientsTable({dish}:DishIngredientsTableProps) {
    return(
        
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Id Ингредиента</th>
                    <th>Ингредиент</th>
                    <th>Вес до обработки</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {dish.dishes_ingredients.map(c => <tr className='text-center'>
                    <td>{c.ingredient.id}</td>
                    <td>{c.ingredient.name} {c.ingredient.type.name}</td>
                    <td>{c.ingredient_raw_weight}г.</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishIngredientsTable;