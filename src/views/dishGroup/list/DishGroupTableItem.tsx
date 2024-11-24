import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DishGroupDTO } from "../../../api/dishGroups"
import { DishGroupField } from "../../../hooks/sort/useSortDishGroups"

interface DishGroupsTableItemProps {
    dishGroup: DishGroupDTO
    fieldsToExclude?: DishGroupField[]
}

function DishGroupsTableItem({dishGroup, fieldsToExclude}:DishGroupsTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishGroupField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{dishGroup.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishGroupField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/dish-groups/details/${dishGroup.id}`}>{dishGroup.name}</Link></td>
            }
        </>
    )
}

export default DishGroupsTableItem