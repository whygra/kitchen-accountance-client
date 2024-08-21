import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IngredientProductDTO } from "../../../api/products";
import { IngredientWithProductsDTO } from "../../../api/ingredients";
import IngredientDetails from "./IngredientDetails";
import IngredientDetailsModel from "../../../models/IngredientDetailsModel";



interface ProductsWeightsCalculatorProps{
    ingredient: IngredientWithProductsDTO
}

function ProductsWeightsCalculator({ingredient}:ProductsWeightsCalculatorProps) {
    
    const ingredientDetails = new IngredientDetailsModel(ingredient)
    const [productsCalcData, setProductsCalcData] = useState(ingredientDetails.getProductsWeights(NaN))

    function calcProductWeights(ingredientAmount: number){
        setProductsCalcData(ingredientDetails.getProductsWeights(ingredientAmount))
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
                            <td>{`${c.product.id}. ${c.product.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ProductsWeightsCalculator;
