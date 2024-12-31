import { Form, FormSelect, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IngredientDTO } from "../../../api/ingredients";
import IngredientDetails from "./IngredientDetails";
import { constructIngredientProductsWeightsCalculator, getProductsWeights } from "../../../models/ingredient/IngredientProductsWeightsCalculatorState";
import { calcIngredientCost, constructIngredientCostCalculator, constructProductCostCalculator, ProductCostCalculatorModel, setAmount } from "../../../models/dish/DishCostCalculatorState";
import ProductCostCalculator from "./ProductCostCalculator";
import { Link } from "react-router-dom";

interface ProductsWeightsCalculatorProps{
    ingredient: IngredientDTO
}

function ProductsWeightsCalculator({ingredient}:ProductsWeightsCalculatorProps) {
    const [costCalculator, setCostCalculator] = useState(constructIngredientCostCalculator(ingredient))

    useEffect(()=>{
        calcProductWeights(ingredient.is_item_measured?1:1000)
    }, [])

    function calcProductWeights(ingredientAmount: number){
        setCostCalculator(calcIngredientCost(setAmount(costCalculator, ingredientAmount)))
    }

    function setProductState(state: ProductCostCalculatorModel){
        setCostCalculator({...costCalculator, products:costCalculator.products?.map(p=>p.id==state.id?state:p)})
    }

    return(
        <>
        <h4 className='text-center'>Калькулятор веса и себестоимости</h4>
            <Table className="text-center">
                <thead>
                    <tr>
                        <th>{ingredient.is_item_measured?'Итоговое количество':'Итоговый вес'}</th>
                        <th>Итоговая стоимость</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                type='number'
                                min={ingredient.is_item_measured ? 1 : 50}
                                step={1}
                                value={costCalculator.ingredient_amount}
                                onChange={(e)=>calcProductWeights(parseFloat(e.target.value))}
                            />
                        </td>
                        <td>
                            {costCalculator.cost.toFixed(2)}₽
                        </td>
                    </tr>
                </tbody>
            </Table>
                <Table className='text-center' cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th style={{width:'20%'}}>Продукт</th>
                        <th style={{width:'50%'}}>Позиция закупки</th>
                        <th className="d-none d-md-table-cell">Стоимость 1г.</th>
                        <th className="d-none d-sm-table-cell">Требуемый вес</th>
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
                            <td className="d-none d-md-table-cell"><u>{`${p.gramCost.toFixed(2)} ₽/г.`}</u></td>
                            <td className="d-none d-sm-table-cell"><u>{`${p.weight.toFixed(2)} г.`}</u></td>
                            <td><u>{`${(p.weight*p.gramCost).toFixed(2)} ₽`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ProductsWeightsCalculator;
