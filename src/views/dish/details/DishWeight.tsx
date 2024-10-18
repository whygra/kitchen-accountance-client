import { useEffect, useState } from "react";
import { DishDTO } from "../../../api/dishes";


interface DishWeightProps{
    dish: DishDTO
}

function DishWeight({dish}:DishWeightProps) {
    
    const [weight, setWeight] = useState(NaN)

    function calcWeight(){
        setWeight(
            dish.ingredients
                ?.reduce((sum, current)=>sum+(current.ingredient_amount??0)*current.item_weight*(100-(current.waste_percentage??0))/100, 0)
                ?? 0
        )
    }

    useEffect(()=>{
        calcWeight()
    }, [])

    return(
        <>{weight}</>
    )
}
export default DishWeight;
