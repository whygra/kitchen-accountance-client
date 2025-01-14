import { Accordion, Form, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import IngredientCostCalculator from "./IngredientCostCalculator";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";


function DishCostCalculator() {
    
    const {model} = useContext(dishCostCalculatorContext)

    const ingredients = model.ingredients

    return (
        <>
            <h4 className='text-center'>Калькулятор себестоимости: {Number(model.cost).toFixed(2)} руб.</h4>
                <Accordion>
                    {ingredients.map(i=>
                        <div key={`${i.id}`}>
                            <IngredientCostCalculator ingredient={i}/>
                        </div>
                    )}
                </Accordion>
        </>
    )
}
export default DishCostCalculator;
