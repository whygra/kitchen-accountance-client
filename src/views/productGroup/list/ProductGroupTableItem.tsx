import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProductGroupDTO } from "../../../api/productGroups"
import { ProductGroupField } from "../../../hooks/sort/useSortProductGroups"

interface ProductGroupsTableItemProps {
    productgroup: ProductGroupDTO
    fieldsToExclude?: ProductGroupField[]
}

function ProductGroupsTableItem({productgroup: productGroup, fieldsToExclude}:ProductGroupsTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProductGroupField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{productGroup.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProductGroupField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/product-groups/details/${productGroup.id}`}>{productGroup.name}</Link></td>
            }
        </>
    )
}

export default ProductGroupsTableItem