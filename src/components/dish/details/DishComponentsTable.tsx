import { Table } from "react-bootstrap";
import { GetDishWithComponentsDTO } from "../../../api/dishWithComponents";

interface DishComponentsTableProps {
    dish: GetDishWithComponentsDTO
}

function DishComponentsTable({dish}:DishComponentsTableProps) {
    return(
        
        <><h4 className="text-center">Продукты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Id Ингредиента</th>
                    <th>Ингредиент</th>
                    <th>Вес без обработки</th>
                    <th>Процент отхода</th>
                </tr>
            </thead>
            <tbody>

                {dish.dishes_components.map(c => <tr className='text-center'>
                    <td>{c.component.id}</td>
                    <td>{c.component.name} {c.component.type.name}</td>
                    <td>{c.component_raw_weight}г.</td>
                    <td>{c.waste_percentage}%</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishComponentsTable;