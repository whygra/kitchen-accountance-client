import { Accordion, Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/dish/DishCostCalculatorState";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";
import TooltipIcon from "../../shared/TooltipIcon";


interface ProductCostCalculatorProps{
    product: ProductCostCalculatorModel
    setState: (product: ProductCostCalculatorModel)=>void
}

function ProductCostCalculator({product, setState}:ProductCostCalculatorProps) {
    const [selectedId, setSelectedId] = useState(0)

    function calcProductGramCost(purchaseOptionId: number) {

        setState(
            selectPurchaseOptionId(product, purchaseOptionId)
        )
        setSelectedId(purchaseOptionId)
    }

    return(
        <>
        <FormSelect
            value={selectedId} 
            onChange={(e) => calcProductGramCost(parseInt(e.target.value))}>
            {product.purchase_options.map(o => 
                <option value={o.id}>
                    {o.is_relevant
                        ? ''
                        : '! '
                    }
                    {o.name} 
                    ({o.distributor?.name}) {
                        (o.price&&o.net_weight) 
                        ? `${(o.price/o.net_weight).toFixed(2)}₽/г.`
                        :''
                    }
                </option>
            )}
        </FormSelect>
        </>
    )
}
export default ProductCostCalculator;
