import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { IngredientCategoryDTO } from "../../../api/ingredientCategories"
import { IngredientCategoryField } from "../../../hooks/sort/useSortIngredientCategories"

interface IngredientCategoriesTableItemProps {
    ingredientcategory: IngredientCategoryDTO
    fieldsToExclude?: IngredientCategoryField[]
}

function IngredientCategoriesTableItem({ingredientcategory: ingredientCategory, fieldsToExclude}:IngredientCategoriesTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==IngredientCategoryField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{ingredientCategory.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==IngredientCategoryField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/ingredient-categories/details/${ingredientCategory.id}`}>{ingredientCategory.name}</Link></td>
            }
        </>
    )
}

export default IngredientCategoriesTableItem