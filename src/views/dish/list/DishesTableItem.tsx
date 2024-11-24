import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { calcDishWeight, DishDTO } from "../../../api/dishes"
import { DishField } from "../../../hooks/sort/useSortDishes"
import { Image } from "react-bootstrap"

interface DishesTableItemProps {
    dish: DishDTO
    fieldsToExclude?: DishField[]
}

function DishesTableItem({dish, fieldsToExclude}:DishesTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Image)
                ? <></>
                : <td style={{width:'5%'}}><Image width={40} src={`${dish.image?.url}`}/></td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Id)
                ? <></>
                : <td style={{width:'5%'}}>{dish.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Name)
                ? <></>
                : <td style={{width:'20%'}}><Link to={`/dishes/details/${dish.id}`}>{dish.name}</Link></td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Category)
                ? <></>
                : <td style={{width:'20%'}}>{dish.category?.name??'без категории'}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Group)
                ? <></>
                : <td style={{width:'20%'}}>{dish.group?.name??'без группы'}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==DishField.Weight)
                ? <></>
                : <td style={{width:'1%'}}>{calcDishWeight(dish).toFixed(2)}</td>
            }
        </>
    )
}

export default DishesTableItem