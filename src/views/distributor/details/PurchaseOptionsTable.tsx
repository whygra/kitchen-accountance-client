import { Table } from "react-bootstrap";
import { DishWithIngredientsDTO } from "../../../api/dishes";
import { DistributorWithPurchaseOptionsDTO } from "../../../api/distributors";
import { Link } from "react-router-dom";

interface PurchaseOptionsTableProps {
    distributor: DistributorWithPurchaseOptionsDTO
}

function PurchaseOptionsTable({distributor}:PurchaseOptionsTableProps) {
    return(
        
        <><h4 className="text-center">Позиции закупки</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Наименование</th>
                    <th>Продукты</th>
                    <th>Единица измерения</th>
                    <th>Масса нетто</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                {distributor.purchase_options.map(o => <tr className='text-center'>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.products.map(p=><>{p.name}, </>)}</td>
                    <td>{o.unit.long}</td>
                    <td>{o.net_weight} г.</td>
                    <td>{o.price} руб.</td>
                </tr>
                )}
            </tbody>
        </Table></>
    )
}

export default PurchaseOptionsTable;