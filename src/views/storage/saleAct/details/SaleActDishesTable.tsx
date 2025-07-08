import { Table } from "react-bootstrap";
import { SaleActDTO } from "../../../../api/storage/saleActs";
import { Link } from "react-router-dom";
import usePagination from "../../../../hooks/usePagination";

interface SaleActProductsTableProps {
    saleAct: SaleActDTO
}

function SaleActItemsTable({saleAct}:SaleActProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(saleAct.items?.length??0)

    return(
        <><h4 className="text-center">Полуфабрикаты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr className='text-center'>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Стоимость</th>
                </tr>
            </thead>
            <tbody>

                {saleAct.items
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/items/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.amount?.toFixed(0)}</td>
                        <td>{p.price?.toFixed(0)} руб</td>
                        <td>{((p.price??0)*(p.amount??0)).toFixed(0)} руб</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default SaleActItemsTable;