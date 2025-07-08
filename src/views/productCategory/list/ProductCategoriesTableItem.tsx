import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProductCategoryDTO } from "../../../api/nomenclature/productCategories"
import { ProductCategoryField } from "../../../hooks/sort/useSortProductCategories"
import GridTableRow from "../../shared/GridTableRow"

interface ProductCategoriesTableItemProps {
    productCategory: ProductCategoryDTO
    fieldsToExclude?: ProductCategoryField[]
}

function ProductCategoriesTableItem({productCategory, fieldsToExclude}:ProductCategoriesTableItemProps) {
    const cells = [
        {   
            field: ProductCategoryField.Id,
            element:
                <>{productCategory.id}</>,
            span: 1
        },
        {   
            field: ProductCategoryField.Name,
            element:
                <Link to={`/product-categories/details/${productCategory.id}`}>{productCategory.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default ProductCategoriesTableItem