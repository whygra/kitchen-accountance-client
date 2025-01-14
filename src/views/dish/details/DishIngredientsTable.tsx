import { Button, Table } from "react-bootstrap";
import { DishDTO } from "../../../api/dishes";
import { Link } from "react-router-dom";

interface DishIngredientsTableProps {
    dish: DishDTO
}

function DishIngredientsTable({dish}:DishIngredientsTableProps) {
    return(
        
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Ингредиент</th>
                    <th>Вес до обработки</th>
                    <th>Потеря веса</th>
                </tr>
            </thead>
            <tbody>

                {dish.ingredients?.map(c => <tr className='text-center'>
                    <td><Link to={`/ingredients/details/${c.id}`}>{c.name} {c.type?.name}</Link></td>
                    <td>{c.item_weight!=1 ?`${c.ingredient_amount}шт. * ${c.item_weight}г.` : `${c.ingredient_amount}г.`}</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishIngredientsTable;