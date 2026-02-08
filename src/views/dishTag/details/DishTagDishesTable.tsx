import { Button, Table } from "react-bootstrap";
import { DishTagDTO } from "../../../api/nomenclature/dishTags";
import { Link } from "react-router-dom";

interface DishTagDishesTableProps {
    dishTag: DishTagDTO
}

function DishTagDishesTable({dishTag}:DishTagDishesTableProps) {
    return(
        
        <><h4 className="text-center">Ингредиенты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Ингредиент</th>
                </tr>
            </thead>
            <tbody>

                {dishTag.dishes?.map(c => <tr className='text-center'>
                    <td><Link to={`/dishes/details/${c.id}`}>{c.name}</Link></td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default DishTagDishesTable;