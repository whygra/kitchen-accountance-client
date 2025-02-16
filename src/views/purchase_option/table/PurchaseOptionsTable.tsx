import { Collapse, Form, Table } from "react-bootstrap";

import useSortPurchaseOptions, { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions";
import usePagination from "../../../hooks/usePagination";
import usePurchaseOptionsTableHeader from "../../../hooks/usePurchaseOptionsTableHeader";
import { PurchaseOptionDTO } from "../../../api/purchaseOptions";
import PurchaseOptionsTableItem from "./PurchaseOptionsTableItem";
import { useMediaQuery } from "react-responsive";
import { WindowSize } from "../../shared/GridTableRow";

interface PurchaseOptionsTableProps {
    purchaseOptions: PurchaseOptionDTO[]
    fieldsToExclude?: PurchaseOptionField[]
}

function PurchaseOptionsTable({purchaseOptions, fieldsToExclude}:PurchaseOptionsTableProps) {

    const {getPredicate, getComparer, header} = usePurchaseOptionsTableHeader(false, fieldsToExclude)
    
    const filtered = purchaseOptions
    .filter(getPredicate())
    .sort(getComparer())
    
    const {sliceLimits, nav} = usePagination(filtered?.length??0)
    return(
        
        <>
            {header}
                <div className="pe-5">
                {filtered
                ?.slice(sliceLimits.start, sliceLimits.end)
                .map(o => 
                    <div className="border-bottom">
                        <PurchaseOptionsTableItem fieldsToExclude={fieldsToExclude} purchaseOption={o}/>
                    </div>
                )}
                </div>
            {nav}
        </>
    )
}

export default PurchaseOptionsTable;