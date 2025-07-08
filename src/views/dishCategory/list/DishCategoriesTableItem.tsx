import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DishCategoryDTO } from "../../../api/nomenclature/dishCategories"
import { DishCategoryField } from "../../../hooks/sort/useSortDishCategories"
import GridTableRow from "../../shared/GridTableRow"

interface DishCategoriesTableItemProps {
    dishCategory: DishCategoryDTO
    fieldsToExclude?: DishCategoryField[]
}

function DishCategoriesTableItem({dishCategory, fieldsToExclude}:DishCategoriesTableItemProps) {
    
    const cells = [
        {   
            field: DishCategoryField.Id,
            element: 
                <>{dishCategory.id}</>,
            span: 1
        },
        {   
            field: DishCategoryField.Name,
            element: 
                <Link to={`/dish-categories/details/${dishCategory.id}`}>{dishCategory.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default DishCategoriesTableItem