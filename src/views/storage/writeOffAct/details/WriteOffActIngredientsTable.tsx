import { Table } from "react-bootstrap";
import { WriteOffActDTO } from "../../../../api/storage/writeOffActs";
import { Link } from "react-router-dom";
import usePagination from "../../../../hooks/usePagination";

interface WriteOffActProductsTableProps {
    writeOffAct: WriteOffActDTO
}

function WriteOffActIngredientsTable({writeOffAct}:WriteOffActProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(writeOffAct.ingredients?.length??0)

    return(
        <><h4 className="text-center">Полуфабрикаты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr className='text-center'>
                    <th>Наименование</th>
                    <th>Масса нетто 1 ед</th>
                    <th>Количество</th>
                </tr>
            </thead>
            <tbody>

                {writeOffAct.ingredients
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/ingredients/details/${p.id}`}>{p.name}</Link></td>
                        <td>{p.item_weight?.toFixed(0)} г/шт</td>
                        <td>{p.amount?.toFixed(0)}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default WriteOffActIngredientsTable;