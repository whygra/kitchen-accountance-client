import { Button, Table } from "react-bootstrap";
import { DishGroupDTO } from "../../../api/nomenclature/dishGroups";
import { Link } from "react-router-dom";

interface DishGroupDishesTableProps {
    dishGroup: DishGroupDTO
}

function DishGroupDishesTable({dishGroup}:DishGroupDishesTableProps) {
    return(
        
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Ингредиент</th>
                </tr>
            </thead>
            <tbody>

                {dishGroup.dishes?.map(c => <tr className='text-center'>
                    <td><Link to={`/dishes/details/${c.id}`}>{c.name}</Link></td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishGroupDishesTable;