import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishIngredientDTO, GetDishWithIngredientsDTO } from "../../../api/dishWithIngredients";


interface DishIngredientWithRequiredWeight{
    dish_ingredient: GetDishIngredientDTO
    weight: number
}

interface IngredientsWeightsCalculatorProps{
    dish: GetDishWithIngredientsDTO
}

function IngredientsWeightsCalculator({dish}:IngredientsWeightsCalculatorProps) {
    
    const [ingredientsCalcData, setIngredientsCalcData] = useState<DishIngredientWithRequiredWeight[]>()

    useEffect(()=>{
        setIngredientsCalcData(dish.dishes_ingredients
            .map(d=>{return{dish_ingredient: d, weight: NaN}}))
    }, [])

    function calcIngredientsWeights(requiredAmount: number){
        setIngredientsCalcData(ingredientsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    weight: requiredAmount * p.dish_ingredient.ingredient_raw_weight
                }
            }
        ))
    }
    
    return(
        <>
        <h4 className='text-center'>Калькулятор веса</h4>
            <Form.Label>Итоговый вес</Form.Label>
            <Form.Control
                type='number'
                min={1}
                step={1}
                defaultValue={1}
                onChange={(e)=>calcIngredientsWeights(parseFloat(e.target.value))}
                />
                <Table cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th>Ингредиент</th>
                        <th className='text-end'>Требуемый вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredientsCalcData?.map(c=>
                        <tr>
                            <td>{`${c.dish_ingredient.ingredient.id}. ${c.dish_ingredient.ingredient.name} ${c.dish_ingredient.ingredient.type.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default IngredientsWeightsCalculator;
