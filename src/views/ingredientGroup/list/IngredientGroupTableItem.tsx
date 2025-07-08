import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { IngredientGroupDTO } from "../../../api/nomenclature/ingredientGroups"
import { IngredientGroupField } from "../../../hooks/sort/useSortIngredientGroups"
import GridTableRow from "../../shared/GridTableRow"

interface IngredientGroupsTableItemProps {
    ingredientGroup: IngredientGroupDTO
    fieldsToExclude?: IngredientGroupField[]
}

function IngredientGroupsTableItem({ingredientGroup, fieldsToExclude}:IngredientGroupsTableItemProps) {
    const cells = [
        {   
            field: IngredientGroupField.Id,
            element: 
                <>{ingredientGroup.id}</>,
            span: 1
        },
        {   
            field: IngredientGroupField.Name,
            element: 
                <Link to={`/ingredient-groups/details/${ingredientGroup.id}`}>{ingredientGroup.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default IngredientGroupsTableItem