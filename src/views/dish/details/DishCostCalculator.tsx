import { Accordion, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishIngredientDTO, GetDishWithIngredientsDTO, GetDishWithPurchaseOptionsDTO, getDishWithPurchaseOptions } from "../../../api/dishes";
import IngredientCostCalculator from "./IngredientCostCalculator";


interface DishCostCalculatorProps{
    dishId: number
}

function DishCostCalculator({dishId}:DishCostCalculatorProps) {

    const [ingredientCosts, setIngredientCosts] = useState<{id:number, cost:number}[]>([])
    const [cost, setCost] = useState(NaN)
    const [isLoading, setIsLoading] = useState(false)
    const [dish, setDish] = useState<GetDishWithPurchaseOptionsDTO>()

    useEffect(()=>{loadDish()}, [])

    async function loadDish() {
        setIsLoading(true)
        const result = await getDishWithPurchaseOptions(dishId)
        if(result!=null) {
            setDish(result)
            setIngredientCosts(result.dishes_ingredients.map(i=>{return{id:i.id, cost:0}}))
        }
        setIsLoading(false)
    }
    
    function calcCost(ingredientCosts:{id:number; cost:number}[]): number {
        return ingredientCosts.reduce((total, current)=>total+current.cost, 0)
    }
    
    function setIngredientCost(id:number, cost:number) {
        const costs = ingredientCosts.map(ingredient=>ingredient.id==id?{id, cost}:ingredient)
        setIngredientCosts(costs)
        setCost(calcCost(costs))
    }

    return (
        <>
            <h4 className='text-center'>Калькулятор себестоимости</h4>
            {isLoading ? <>Loading...</> : 
                <><Accordion>
                    {dish?.dishes_ingredients.map(i=>
                        <IngredientCostCalculator setIngredientCost={setIngredientCost} dish_ingredient={i}/>
                    )}
                </Accordion>
                <h3 className="pt-2 text-center">Итоговая стоимость: {cost} руб.</h3></>
            }
        </>
    )
}
export default DishCostCalculator;
