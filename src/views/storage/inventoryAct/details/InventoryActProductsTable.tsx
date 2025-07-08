import { Table } from "react-bootstrap";
import { InventoryActDTO } from "../../../../api/storage/inventoryActs";
import { Link } from "react-router-dom";
import usePagination from "../../../../hooks/usePagination";

interface InventoryActProductsTableProps {
    inventoryAct: InventoryActDTO
}

function InventoryActProductsTable({inventoryAct}:InventoryActProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(inventoryAct.products?.length??0)

    return(
        <><h4 className="text-center">Продукты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Наименование</th>
                    <th>Масса нетто 1 ед</th>
                    <th>Количество</th>
                </tr>
            </thead>
            <tbody>

                {inventoryAct.products
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/products/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.net_weight?.toFixed(0)} г/шт</td>
                        <td>{p.amount?.toFixed(0)}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default InventoryActProductsTable;