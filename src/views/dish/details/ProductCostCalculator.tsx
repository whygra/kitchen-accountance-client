import { Accordion, Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { IngredientProductWithPurchaseOptionsDTO } from "../../../api/products";
import { ProductPurchaseOption } from "../../../api/purchaseOptions";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/DishCostCalculatorModel";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";


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
        <Form.Group>
            <Form.Label>
                {product.id}. {product.name} {Number(product.gramCost).toFixed(2)}:
            </Form.Label>
            <FormSelect
                value={selectedId} 
                onChange={(e) => calcProductGramCost(parseInt(e.target.value))}>
                {product.purchase_options.map(o => <option value={o.id}>{o.name} {o.price} р. ({o.distributor.name})</option>
                )}
            </FormSelect>
        </Form.Group>
    )
}
export default ProductCostCalculator;
