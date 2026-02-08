import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { IngredientTagDTO } from "../../../api/nomenclature/ingredientTags"
import { IngredientTagField } from "../../../hooks/sort/useSortIngredientTags"
import GridTableRow from "../../shared/GridTableRow"

interface IngredientTagsTableItemProps {
    ingredientTag: IngredientTagDTO
    fieldsToExclude?: IngredientTagField[]
}

function IngredientTagsTableItem({ingredientTag, fieldsToExclude}:IngredientTagsTableItemProps) {
    const cells = [
        {   
            field: IngredientTagField.Id,
            element: 
                <>{ingredientTag.id}</>,
            span: 1
        },
        {   
            field: IngredientTagField.Name,
            element: 
                <Link to={`/ingredient-tags/details/${ingredientTag.id}`}>{ingredientTag.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default IngredientTagsTableItem