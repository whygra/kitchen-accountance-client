import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProductTagDTO } from "../../../api/nomenclature/productTags"
import { ProductTagField } from "../../../hooks/sort/useSortProductTags"
import GridTableRow from "../../shared/GridTableRow"

interface ProductTagsTableItemProps {
    producttag: ProductTagDTO
    fieldsToExclude?: ProductTagField[]
}

function ProductTagsTableItem({producttag: productTag, fieldsToExclude}:ProductTagsTableItemProps) {
    const cells = [
        {   
            field: ProductTagField.Id,
            element: 
                <>{productTag.id}</>,
            span: 1
        },
        {   
            field: ProductTagField.Name,
            element: 
                <Link to={`/product-tags/details/${productTag.id}`}>{productTag.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default ProductTagsTableItem