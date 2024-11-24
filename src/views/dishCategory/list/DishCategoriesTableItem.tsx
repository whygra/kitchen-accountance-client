import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DishCategoryDTO } from "../../../api/dishCategories"
import { DishCategoryField } from "../../../hooks/sort/useSortDishCategories"

interface DishCategoriesTableItemProps {
    dishcategory: DishCategoryDTO
    fieldsToExclude?: DishCategoryField[]
}

function DishCategoriesTableItem({dishcategory: dishCategory, fieldsToExclude}:DishCategoriesTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishCategoryField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{dishCategory.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishCategoryField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/dish-categories/details/${dishCategory.id}`}>{dishCategory.name}</Link></td>
            }
        </>
    )
}

export default DishCategoriesTableItem