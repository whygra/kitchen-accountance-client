import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { calcDishWeight, DishDTO } from "../../../api/dishes"
import { DishField } from "../../../hooks/sort/useSortDishes"

interface DishesTableItemProps {
    dish: DishDTO
    fieldsToExclude?: DishField[]
}

function DishesTableItem({dish, fieldsToExclude}:DishesTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{dish.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/dishes/details/${dish.id}`}>{dish.name}</Link></td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Category)
                ? <></>
                : <td style={{width:'2%'}}>{dish.category?.name??'без категории'}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Weight)
                ? <></>
                : <td style={{width:'2%'}}>{calcDishWeight(dish)}</td>
            }
        </>
    )
}

export default DishesTableItem