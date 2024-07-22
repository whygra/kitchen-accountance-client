import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishIngredientDTO, GetDishWithIngredientsDTO } from "../../../api/dishWithIngredients";
import { current } from "@reduxjs/toolkit";


interface DishWeightProps{
    dish: GetDishWithIngredientsDTO
}

function DishWeight({dish}:DishWeightProps) {
    
    const [weight, setWeight] = useState(NaN)

    function calcWeight(){
        setWeight(
            dish.dishes_ingredients
                .reduce((sum, current)=>sum+current.ingredient_raw_weight*(100-current.waste_percentage)/100, 0)
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
