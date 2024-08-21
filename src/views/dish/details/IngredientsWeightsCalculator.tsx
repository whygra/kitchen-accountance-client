import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DishWithIngredientsDTO } from "../../../api/dishes";
import { DishIngredientDTO } from "../../../api/ingredients";


interface DishIngredientWithRequiredWeight{
    dish_ingredient: DishIngredientDTO
    weight: number
}

interface IngredientsWeightsCalculatorProps{
    dish: DishWithIngredientsDTO
}

function IngredientsWeightsCalculator({dish}:IngredientsWeightsCalculatorProps) {
    
    const [ingredientsCalcData, setIngredientsCalcData] = useState<DishIngredientWithRequiredWeight[]>()

    useEffect(()=>{
        setIngredientsCalcData(dish.ingredients
            .map(d=>{return{dish_ingredient: d, weight: NaN}}))
    }, [])

    function calcIngredientsWeights(requiredAmount: number){
        setIngredientsCalcData(ingredientsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    weight: requiredAmount * p.dish_ingredient.ingredient_amount * p.dish_ingredient.item_weight
                }
            }
        ))
    }
    
    return(
        <>
        <h4 className='text-center'>Калькулятор веса</h4>
            <Form.Label>Количество порций</Form.Label>
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
                            <td>{`${c.dish_ingredient.id}. ${c.dish_ingredient.name} ${c.dish_ingredient.type.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default IngredientsWeightsCalculator;
