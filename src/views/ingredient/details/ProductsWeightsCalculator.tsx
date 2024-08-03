import { Form, Table } from "react-bootstrap";
import { GetIngredientProductDTO, GetIngredientWithProductsDTO } from "../../../api/ingredients";
import { useEffect, useState } from "react";


interface IngredientProductWithRequiredWeight{
    ingredient_product: GetIngredientProductDTO
    weight: number
}

interface ProductsWeightsCalculatorProps{
    ingredient: GetIngredientWithProductsDTO
}

function ProductsWeightsCalculator({ingredient}:ProductsWeightsCalculatorProps) {
    
    const [productsCalcData, setProductsCalcData] = useState<IngredientProductWithRequiredWeight[]>()

    useEffect(()=>{
        setProductsCalcData(ingredient.ingredients_products
            .map(c=>{return{ingredient_product: c, weight: NaN}}))
    }, [])

    function calcProductWeights(requiredWeight: number){
        setProductsCalcData(productsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    weight: Math.round(requiredWeight * (
                        // доля содержания
                        p.ingredient_product.raw_content_percentage / 100
                        // умножить на 1 + доля отхода
                        * (1 + (p.ingredient_product.waste_percentage / 100))
                    ))
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
                min={50}
                step={1}
                defaultValue={100}
                onChange={(e)=>calcProductWeights(parseFloat(e.target.value))}
                />
                <Table cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th>Продукт</th>
                        <th className='text-end'>Требуемый вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsCalcData?.map(c=>
                        <tr>
                            <td>{`${c.ingredient_product.product.id}. ${c.ingredient_product.product.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ProductsWeightsCalculator;
