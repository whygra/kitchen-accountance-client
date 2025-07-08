import { Table } from "react-bootstrap";
import { PurchaseActDTO } from "../../../../api/storage/purchaseActs";
import { Link } from "react-router-dom";
import usePagination from "../../../../hooks/usePagination";

interface PurchaseActItemsTableProps {
    purchaseAct: PurchaseActDTO
}

function PurchaseActItemsTable({purchaseAct}:PurchaseActItemsTableProps) {
        
    const {sliceLimits, nav} = usePagination(purchaseAct.items?.length??0)

    return(
        <><h4 className="text-center">Позиции</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr className='text-center'>
                    <th>Наименование</th>
                    <th>Масса нетто 1 ед</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                </tr>
            </thead>
            <tbody>

                {purchaseAct.items
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/purchase-options/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.net_weight?.toFixed(0)} г/шт</td>
                        <td>{p.price?.toFixed(2)} руб.</td>
                        <td>{p.amount?.toFixed(0)} {p.unit?.short}</td>
                        <td>{(p.price*(p.amount??0)).toFixed(2)} руб.</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default PurchaseActItemsTable;