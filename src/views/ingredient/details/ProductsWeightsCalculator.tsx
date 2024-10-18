import { Form, FormSelect, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IngredientDTO } from "../../../api/ingredients";
import IngredientDetails from "./IngredientDetails";
import { constructIngredientProductsWeightsCalculator, getProductsWeights } from "../../../models/IngredientProductsWeightsCalculatorState";
import { constructIngredientCostCalculator, constructProductCostCalculator, ProductCostCalculatorModel, setAmount } from "../../../models/DishCostCalculatorState";
import ProductCostCalculator from "./ProductCostCalculator";
import { Link } from "react-router-dom";

interface ProductsWeightsCalculatorProps{
    ingredient: IngredientDTO
}

function ProductsWeightsCalculator({ingredient}:ProductsWeightsCalculatorProps) {
    
    const [costCalculator, setCostCalculator] = useState(constructIngredientCostCalculator(ingredient))

    function calcProductWeights(ingredientAmount: number){
        setCostCalculator(setAmount(costCalculator, ingredientAmount))
    }

    function setProductState(state: ProductCostCalculatorModel){
        setCostCalculator({...costCalculator, products:costCalculator.products.map(p=>p.id==state.id?state:p)})
    }

    return(
        <>
        <h4 className='text-center'>Калькулятор веса и себестоимости</h4>
            <Form.Label>{ingredient.is_item_measured?'Итоговое количество':'Итоговый вес'}</Form.Label>
            <Form.Control
                type='number'
                min={ingredient.is_item_measured ? 1 : 50}
                step={1}
                defaultValue={ingredient.is_item_measured ? 1 : 1000}
                onChange={(e)=>calcProductWeights(parseFloat(e.target.value))}
                />
                <Table className='text-center' cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th style={{width:'20%'}}>Продукт</th>
                        <th style={{width:'50%'}}>Позиция закупки</th>
                        <th>Стоимость 1г.</th>
                        <th>Требуемый вес</th>
                        <th>Себестоимость</th>
                    </tr>
                    </thead>
                    <tbody>
                    {costCalculator.products?.map(p=>
                        <tr>
                            <td><Link to={`/products/details/${p.id}`}>{p.id}. {p.name}</Link></td>
                            <td>
                                <ProductCostCalculator product={p} setProductState={setProductState}/>
                            </td>
                            <td><u>{`${p.gramCost.toFixed(2)} ₽/г.`}</u></td>
                            <td><u>{`${p.weight.toFixed(2)} г.`}</u></td>
                            <td><u>{`${(p.weight*p.gramCost).toFixed(2)} ₽`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ProductsWeightsCalculator;
