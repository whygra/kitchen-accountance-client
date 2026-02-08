import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DishTagDTO } from "../../../api/nomenclature/dishTags"
import { DishTagField } from "../../../hooks/sort/useSortDishTags"
import GridTableRow from "../../shared/GridTableRow"

interface DishTagsTableItemProps {
    dishTag: DishTagDTO
    fieldsToExclude?: DishTagField[]
}

function DishTagsTableItem({dishTag, fieldsToExclude}:DishTagsTableItemProps) {
    
    const cells = [
        {   
            field: DishTagField.Id,
            element: 
                <>{dishTag.id}</>,
            span: 1
        },
        {   
            field: DishTagField.Name,
            element: 
                <Link to={`/dish-tags/details/${dishTag.id}`}>{dishTag.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default DishTagsTableItem