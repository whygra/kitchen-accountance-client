import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProductCategoryDTO } from "../../../api/productCategories"
import { ProductCategoryField } from "../../../hooks/sort/useSortProductCategories"

interface ProductCategoriesTableItemProps {
    productcategory: ProductCategoryDTO
    fieldsToExclude?: ProductCategoryField[]
}

function ProductCategoriesTableItem({productcategory: productCategory, fieldsToExclude}:ProductCategoriesTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProductCategoryField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{productCategory.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProductCategoryField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/product-categories/details/${productCategory.id}`}>{productCategory.name}</Link></td>
            }
        </>
    )
}

export default ProductCategoriesTableItem