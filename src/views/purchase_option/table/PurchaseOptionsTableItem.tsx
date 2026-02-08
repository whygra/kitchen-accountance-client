import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"
import TooltipIcon from "../../shared/TooltipIcon"

interface PurchaseOptionsTableItemProps {
    purchaseOption: PurchaseOptionDTO
    fieldsToExclude?: PurchaseOptionField[]
}

function PurchaseOptionsTableItem({purchaseOption, fieldsToExclude}:PurchaseOptionsTableItemProps) {
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseOptionField.Code,
            element: 
                <>{purchaseOption.code}</>,
            span: 2
        },
        {   
            field: PurchaseOptionField.Name,
            element: 
                <><Link to={`/purchase-options/details/${purchaseOption.id}`}>{purchaseOption.name}</Link>
                    {(purchaseOption.is_relevant??true)
                        ?<></>
                        :<TooltipIcon tooltip="Не актуально" textColor="warning" icon="exclamation-triangle-fill"/>
                    }
                
                </>,
            span: 5
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseOptionField.Distributor,
            element: 
                <Link to={`/distributors/details/${purchaseOption.distributor?.id??0}`}>{purchaseOption.distributor?.name}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseOptionField.Product,
            element: 
                purchaseOption.product?<Link to={`/products/details/${purchaseOption.product.id}`}>{purchaseOption.product.name}</Link> : <>-нет-</>,
            span: 3
        },
        {   
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.NetWeight,
            element: 
                <>{purchaseOption.net_weight}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseOptionField.Price,
            element: 
                <>{purchaseOption.price}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseOptionField.Unit,
            element: 
                <>{purchaseOption.unit?.short}</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default PurchaseOptionsTableItem