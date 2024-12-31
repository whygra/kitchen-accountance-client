import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DishGroupDTO } from "../../../api/dishGroups"
import { DishGroupField } from "../../../hooks/sort/useSortDishGroups"
import GridTableRow from "../../shared/GridTableRow"

interface DishGroupsTableItemProps {
    dishGroup: DishGroupDTO
    fieldsToExclude?: DishGroupField[]
}

function DishGroupsTableItem({dishGroup, fieldsToExclude}:DishGroupsTableItemProps) {
    
    const cells = [
        {   
            field: DishGroupField.Id,
            element: 
                <>{dishGroup.id}</>,
            span: 1
        },
        {   
            field: DishGroupField.Name,
            element: 
                <Link to={`/dish-groups/details/${dishGroup.id}`}>{dishGroup.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default DishGroupsTableItem