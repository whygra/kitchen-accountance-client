import { useEffect, useState } from "react";
import { DishWithIngredientsDTO } from "../../../api/dishes";


interface DishWeightProps{
    dish: DishWithIngredientsDTO
}

function DishWeight({dish}:DishWeightProps) {
    
    const [weight, setWeight] = useState(NaN)

    function calcWeight(){
        setWeight(
            dish.ingredients
                .reduce((sum, current)=>sum+current.ingredient_amount*current.item_weight*(100-current.waste_percentage)/100, 0)
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
