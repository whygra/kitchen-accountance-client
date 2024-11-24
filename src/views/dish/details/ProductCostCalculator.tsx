import { Accordion, Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/dish/DishCostCalculatorState";
import { dishCostCalculatorContext } from "../../../context/dish/DishCostCalculatorContext";


interface IngredientCostCalculatorProps{
    product: ProductCostCalculatorModel
    ingredientId: number
}

function ProductCostCalculator({product, ingredientId}:IngredientCostCalculatorProps) {
    const [selectedId, setSelectedId] = useState(0)
    const {setProductCalculatorState} = useContext(dishCostCalculatorContext)

    function calcProductGramCost(purchaseOptionId: number) {
        setProductCalculatorState(
            ingredientId,
            selectPurchaseOptionId(product, purchaseOptionId)
        )
        setSelectedId(purchaseOptionId)
    }

    return(
        <Table className="text-center text-nowrap">
            <thead><tr>
                <th style={{width: '70%'}}>{product.id}. {product.name}</th>
                <td style={{width: '10%'}} className="text-underline">{product.weight.toFixed(2)}г.</td>
                <td style={{width: '10%'}} className="text-underline">{product.gramCost.toFixed(2)}₽/г.</td>
                <td style={{width: '10%'}} className="text-underline">{(product.weight*product.gramCost).toFixed(2)}₽</td>
            </tr></thead>
            <tbody>
            <tr>
            <td colSpan={4}>
            <FormSelect
                value={selectedId} 
                onChange={(e) => calcProductGramCost(parseInt(e.target.value))}>
                {product.purchase_options.map(o => <option value={o.id}>{o.name} {o.price} р./{o.unit?.short} ({o.distributor?.name})</option>
                )}
            </FormSelect>
            </td>
            </tr>
            </tbody>
        </Table>
    )
}
export default ProductCostCalculator;
