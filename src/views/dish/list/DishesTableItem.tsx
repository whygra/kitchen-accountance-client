import { Link } from "react-router-dom"
import { DishDTO } from "../../../api/nomenclature/dishes"
import { DishField } from "../../../hooks/sort/useSortDishes"
import { Image } from "react-bootstrap"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface DishesTableItemProps {
    dish: DishDTO
    fieldsToExclude?: DishField[]
}

function DishesTableItem({dish, fieldsToExclude}:DishesTableItemProps) {

    const cells = [
        {   
            field: DishField.Image,
            element: 
                <Image style={{opacity:dish.image?.url?1:0.3}} width={40} src={`${(dish.image?.url??'')!='' ?dish.image?.url :'/icons/dish-image-placeholder.png'}`}/>,
            span: 1
        },
        {   
            displayAt: WindowSize.Lg,
            field: DishField.Id,
            element: 
                <>{dish.id}</>,
            span: 1
        },
        {   
            field: DishField.Name,
            element: 
                <Link to={`/dishes/details/${dish.id}`}>{dish.name}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Md,
            field: DishField.Category,
            element:
                <>{dish.category?.name?<Link to={`/dish-categories/details/${dish.category.id}`}>{dish.category.name}</Link>:'без категории'}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Md,
            field: DishField.Group,
            element:
                <>{dish.group?.name?<Link to={`/dish-groups/details/${dish.group.id}`}>{dish.group.name}</Link>:'без группы'}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Lg,
            field: DishField.Weight,
            element:
                <>{dish.total_net_weight?.toFixed(0)} г.</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default DishesTableItem