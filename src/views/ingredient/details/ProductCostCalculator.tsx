import { Accordion, Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/DishCostCalculatorState";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";


interface IngredientCostCalculatorProps{
    product: ProductCostCalculatorModel
    setProductState: (product: ProductCostCalculatorModel)=>void
}

function ProductCostCalculator({product, setProductState}:IngredientCostCalculatorProps) {
    const [selectedId, setSelectedId] = useState(0)

    function calcProductGramCost(purchaseOptionId: number) {

        setProductState(
            selectPurchaseOptionId(product, purchaseOptionId)
        )
        setSelectedId(purchaseOptionId)
    }

    return(
        <FormSelect
            value={selectedId} 
            onChange={(e) => calcProductGramCost(parseInt(e.target.value))}>
            {product.purchase_options.map(o => 
                <option value={o.id}>
                    {o.name} 
                    ({o.distributor?.name}) {
                        (o.price&&o.net_weight) 
                        ? `${(o.price/o.net_weight).toFixed(2)}₽/г.`
                        :''
                    }
                </option>
            )}
        </FormSelect>
    )
}
export default ProductCostCalculator;
