import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { IngredientGroupDTO } from "../../../api/ingredientGroups"
import { IngredientGroupField } from "../../../hooks/sort/useSortIngredientGroups"

interface IngredientGroupsTableItemProps {
    ingredientgroup: IngredientGroupDTO
    fieldsToExclude?: IngredientGroupField[]
}

function IngredientGroupsTableItem({ingredientgroup: ingredientGroup, fieldsToExclude}:IngredientGroupsTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==IngredientGroupField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{ingredientGroup.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==IngredientGroupField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/ingredient-groups/details/${ingredientGroup.id}`}>{ingredientGroup.name}</Link></td>
            }
        </>
    )
}

export default IngredientGroupsTableItem