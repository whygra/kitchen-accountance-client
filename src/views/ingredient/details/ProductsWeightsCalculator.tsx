import { Accordion, Form, FormSelect, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IngredientDTO } from "../../../api/nomenclature/ingredients";
import { calcIngredientCost, constructIngredientCostCalculator, IngredientCostCalculatorModel, ProductCostCalculatorModel, setAmount } from "../../../models/dish/DishCostCalculatorState";
import ProductCostCalculator from "./ProductCostCalculator";
import { Link } from "react-router-dom";
import IngredientCostCalculator from "../../dish/details/IngredientCostCalculator";
import TooltipIcon from "../../shared/TooltipIcon";

interface ProductsWeightsCalculatorProps{
    ingredient: IngredientDTO
}

function ProductsWeightsCalculator({ingredient}:ProductsWeightsCalculatorProps) {
    const [costCalculator, setCostCalculator] = useState(constructIngredientCostCalculator({...ingredient}))

    useEffect(()=>{
        calcWeights(ingredient.is_item_measured?1:1000)
    }, [])

    function calcWeights(ingredientAmount: number){
        setCostCalculator(calcIngredientCost(setAmount(costCalculator, ingredientAmount)))
    }

    function setProductCalculatorState(state: ProductCostCalculatorModel){
        setCostCalculator(calcIngredientCost({...costCalculator, products:costCalculator.products?.map(p=>p.key==state.key?state:p)}))
    }

    function setIngredientCalculatorState(state: IngredientCostCalculatorModel){
        console.log(calcIngredientCost({...costCalculator, ingredients:costCalculator.ingredients?.map(i=>i.key==state.key?state:i)}))
        setCostCalculator(calcIngredientCost({...costCalculator, ingredients:costCalculator.ingredients?.map(i=>i.key==state.key?state:i)}))
    }

    return(
        <>
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
                                required
                                type='number'
                                min={ingredient.is_item_measured ? 1 : 50}
                                step={1}
                                value={costCalculator.amount}
                                onChange={(e)=>calcWeights(parseFloat(e.target.value))}
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
                        <th className="d-none d-sm-table-cell">Брутто</th>
                        <th>Себестоимость</th>
                    </tr>
                    </thead>
                    <tbody>
                    {costCalculator.products?.map(p=>
                        <tr>
                            <td><Link to={`/products/details/${p.id}`}>{p.name}</Link>
                                {
                                    p.selected?.is_relevant ?? true
                                    ? <></>
                                    :<TooltipIcon tooltip="Не актуальная позиция закупки" textColor="warning" icon="exclamation-triangle-fill"/>
                                }
                            </td>
                            <td>
                                <ProductCostCalculator product={p} setState={setProductCalculatorState}/>
                            </td>
                            <td className="d-none d-md-table-cell"><u>{`${p.gramCost.toFixed(2)} ₽/г.`}</u></td>
                            <td className="d-none d-sm-table-cell"><u>{`${p.weight.toFixed(2)} г.`}</u></td>
                            <td><u>{`${(p.weight*p.gramCost).toFixed(2)} ₽`}</u></td>
                        </tr>
                    )}
                    
                    </tbody>
                </Table>
                <Accordion>

                    {costCalculator.ingredients?.map(i=>
                        <IngredientCostCalculator setState={setIngredientCalculatorState} ingredient={i}/>
                    )}
                    </Accordion>
        </>
    )
}
export default ProductsWeightsCalculator;
