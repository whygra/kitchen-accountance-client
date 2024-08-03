import { Accordion, Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishIngredientDTO, GetDishIngredientWithPurchaseOptionsDTO, GetDishWithIngredientsDTO, GetDishWithPurchaseOptionsDTO } from "../../../api/dishes";
import { GetIngredientProductWithPurchaseOptionsDTO, GetIngredientWithPurchaseOptionsDTO } from "../../../api/ingredients";


interface IngredientCostCalculatorProps{
    ingredient_product: GetIngredientProductWithPurchaseOptionsDTO
    setProductCostCoefficient: (id: number, cost: number) => void
}

function ProductCostCalculator({ingredient_product, setProductCostCoefficient}:IngredientCostCalculatorProps) {
    const [selectedId, setSelectedId] = useState(0)

    useEffect(()=>{
        if(ingredient_product.product.purchase_options.length > 0){

            calcProductCost(ingredient_product.product.purchase_options[0].id)

        }
    }, [])

    function calcProductCost(purchaseOptionId: number) {
        setSelectedId(purchaseOptionId)
        const option = ingredient_product.product.purchase_options.find(o=>o.id==purchaseOptionId)!
        const cost = 
            // отношение веса требуемого продукта к весу готового ингредиента
            (
                // доля содержания
                ingredient_product.raw_content_percentage / 100
                // умножить на 1 + доля отхода
                * (1 + (ingredient_product.waste_percentage / 100))
            )
            // стоимость 1 грамма
            * option.price/option.net_weight

        setProductCostCoefficient(ingredient_product.id, cost)

    }

    return(
        <Form.Group>
            <Form.Label>
                {ingredient_product.product.id}. {ingredient_product.product.name}: 
            </Form.Label>
            <FormSelect
                value={selectedId} 
                onChange={(e) => calcProductCost(parseInt(e.target.value))}>
                {ingredient_product.product.purchase_options.map(o => <option value={o.id}>{o.name} {o.price} р. ({o.distributor.name})</option>
                )}
            </FormSelect>
        </Form.Group>
    )
}
export default ProductCostCalculator;
