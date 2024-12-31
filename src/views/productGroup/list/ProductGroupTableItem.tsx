import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProductGroupDTO } from "../../../api/productGroups"
import { ProductGroupField } from "../../../hooks/sort/useSortProductGroups"
import GridTableRow from "../../shared/GridTableRow"

interface ProductGroupsTableItemProps {
    productgroup: ProductGroupDTO
    fieldsToExclude?: ProductGroupField[]
}

function ProductGroupsTableItem({productgroup: productGroup, fieldsToExclude}:ProductGroupsTableItemProps) {
    const cells = [
        {   
            field: ProductGroupField.Id,
            element: 
                <>{productGroup.id}</>,
            span: 1
        },
        {   
            field: ProductGroupField.Name,
            element: 
                <Link to={`/product-groups/details/${productGroup.id}`}>{productGroup.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default ProductGroupsTableItem