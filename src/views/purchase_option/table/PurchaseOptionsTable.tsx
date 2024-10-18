import { Collapse, Form, Table } from "react-bootstrap";

import useSortPurchaseOptions, { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions";
import usePagination from "../../../hooks/usePagination";
import usePurchaseOptionsTableHeader from "../../../hooks/usePurchaseOptionsTableHeader";
import { PurchaseOptionDTO } from "../../../api/purchaseOptions";
import PurchaseOptionsTableItem from "./PurchaseOptionsTableItem";

interface PurchaseOptionsTableProps {
    purchaseOptions: PurchaseOptionDTO[]
    fieldsToExclude?: PurchaseOptionField[]
}

function PurchaseOptionsTable({purchaseOptions, fieldsToExclude}:PurchaseOptionsTableProps) {

    const {getPredicate, getComparer, header} = usePurchaseOptionsTableHeader(false, fieldsToExclude)
    
    const filtered = purchaseOptions
    .filter(getPredicate())
    .sort(getComparer())
    
    const {sliceLimits, paginationNav} = usePagination(filtered?.length??0)
    return(
        
        <><h4 className="text-center">Позиции закупки</h4>
        <Table cellPadding={3} cellSpacing={3}>
            {header}
            <tbody>
                {filtered
                ?.slice(sliceLimits.start, sliceLimits.end)
                .map(o => 
                    <tr className="text-center">
                        <PurchaseOptionsTableItem fieldsToExclude={fieldsToExclude} purchaseOption={o}/>
                    </tr>
                )}
            </tbody>
        </Table>
        {paginationNav}
        </>
    )
}

export default PurchaseOptionsTable;