import { Button, Table } from "react-bootstrap";
import { DishWithIngredientsDTO } from "../../../api/dishes";
import { Link } from "react-router-dom";

interface DishIngredientsTableProps {
    dish: DishWithIngredientsDTO
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

                {dish.ingredients.map(c => <tr className='text-center'>
                    <td>{c.id}</td>
                    <td><Link to={`/ingredients/details/${c.id}`}>{c.name} {c.type.name}</Link></td>
                    <td>{c.ingredient_amount*c.item_weight}г.</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishIngredientsTable;