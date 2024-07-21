import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishComponentDTO, GetDishWithComponentsDTO } from "../../../api/dishWithComponents";
import { current } from "@reduxjs/toolkit";


interface DishWeightProps{
    dish: GetDishWithComponentsDTO
}

function DishWeight({dish}:DishWeightProps) {
    
    const [weight, setWeight] = useState(NaN)

    function calcWeight(){
        setWeight(
            dish.dishes_components
                .reduce((sum, current)=>sum+current.component_raw_weight*(100-current.waste_percentage), 0)
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
