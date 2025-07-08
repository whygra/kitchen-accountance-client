import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { IngredientCategoryDTO } from "../../../api/nomenclature/ingredientCategories"
import { IngredientCategoryField } from "../../../hooks/sort/useSortIngredientCategories"
import GridTableRow from "../../shared/GridTableRow"

interface IngredientCategoriesTableItemProps {
    ingredientcategory: IngredientCategoryDTO
    fieldsToExclude?: IngredientCategoryField[]
}

function IngredientCategoriesTableItem({ingredientcategory: ingredientCategory, fieldsToExclude}:IngredientCategoriesTableItemProps) {
    const cells = [
        {   
            field: IngredientCategoryField.Id,
            element: 
                <>{ingredientCategory.id}</>,
            span: 1
        },
        {   
            field: IngredientCategoryField.Name,
            element: 
                <Link to={`/ingredient-categories/details/${ingredientCategory.id}`}>{ingredientCategory.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default IngredientCategoriesTableItem