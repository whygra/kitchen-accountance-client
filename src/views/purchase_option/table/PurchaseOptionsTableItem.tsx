import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

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
                <Link to={`/purchase-options/details/${purchaseOption.id}`}>{purchaseOption.name}</Link>,
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
                purchaseOption.products&&(purchaseOption.products.length > 0)?<Link to={`/products/details/${purchaseOption.products[0].id}`}>{purchaseOption.products[0].name}</Link> : <>-нет-</>,
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