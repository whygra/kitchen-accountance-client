import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DishDTO } from "../../../api/dishes";
import { IngredientDTO } from "../../../api/ingredients";


interface DishIngredientWithRequiredAmount{
    ingredient: IngredientDTO
    amount: number
}

interface IngredientsWeightsCalculatorProps{
    dish: DishDTO
}

function IngredientsWeightsCalculator({dish}:IngredientsWeightsCalculatorProps) {
    
    const [ingredientsCalcData, setIngredientsCalcData] = useState<DishIngredientWithRequiredAmount[]>()

    useEffect(()=>{
        setIngredientsCalcData(dish.ingredients
            ?.map(d=>{return{ingredient: d, amount: NaN}})??[])
    }, []) 

    function calcIngredientsAmounts(requiredAmount: number){
        setIngredientsCalcData(ingredientsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    amount: requiredAmount * p.ingredient.ingredient_amount!
                }
            }
        )??[])
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
                onChange={(e)=>calcIngredientsAmounts(parseFloat(e.target.value))}
                />
                <Table cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th>Ингредиент</th>
                        <th className='text-end'>Требуемый вес/количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredientsCalcData?.map(c=>
                        <tr>
                            <td className="text-nowrap">{`${c.ingredient.name} ${c.ingredient.type?.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.amount)?"-/-":`${c.amount} ${c.ingredient.is_item_measured?'шт.':'г.'}`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default IngredientsWeightsCalculator;
