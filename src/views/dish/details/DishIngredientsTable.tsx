import { Button, Table } from "react-bootstrap";
import { GetDishWithIngredientsDTO } from "../../../api/dishes";
import { Link } from "react-router-dom";

interface DishIngredientsTableProps {
    dish: GetDishWithIngredientsDTO
}

function DishIngredientsTable({dish}:DishIngredientsTableProps) {
    return(
        
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th colSpan={2}>Ингредиент</th>
                    <th>Вес до обработки</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {dish.dishes_ingredients.map(c => <tr className='text-center'>
                    <td>{c.ingredient.id}</td>
                    <td><Link to={`/ingredients/details/${c.ingredient.id}`}>{c.ingredient.name} {c.ingredient.type.name}</Link></td>
                    <td>{c.ingredient_raw_weight}г.</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishIngredientsTable;