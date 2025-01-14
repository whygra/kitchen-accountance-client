import { FormSelect, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/dish/DishCostCalculatorState";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";
import GridTableRow, { WindowSize } from "../../shared/GridTableRow";


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
            <GridTableRow cells={[
                {
                    element: <b className="text-wrap text-start bg-transparent">{product.name}</b>,
                    span: 5
                },
                {
                    displayAt: WindowSize.Sm,
                    element: <>{product.weight.toFixed(2)}г.</>,
                    span: 1,
                },
                {
                    displayAt: WindowSize.Lg,
                    element: <>{product.gramCost.toFixed(2)}₽/г.</>,
                    span: 1,
                },
                {
                    element: <>{(product.weight*product.gramCost).toFixed(2)}₽</>,
                    span: 1,
                },
            ]}/>
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
