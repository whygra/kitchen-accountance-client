import { FormSelect, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProductCostCalculatorModel, selectPurchaseOptionId } from "../../../models/dish/DishCostCalculatorState";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";
import GridTableRow, { WindowSize } from "../../shared/GridTableRow";
import { Link } from "react-router-dom";
import TooltipIcon from "../../shared/TooltipIcon";


interface ProductCostCalculatorProps{
    product: ProductCostCalculatorModel
    setState: (state:ProductCostCalculatorModel)=>void
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
        <tr>
            <td width={'20%'}><b className="text-wrap text-start bg-transparent">
                    <Link to={`/products/details/${product.id}`}>{product.name}</Link>
                    {
                        product.selected?.is_relevant ?? true
                        ? <></>
                        :<TooltipIcon tooltip="Не актуальные позиции закупки" textColor="warning" icon="exclamation-triangle-fill"/>
                    }
                </b>
            </td>
            <td width={'50%'}>
                <FormSelect
                        value={selectedId} 
                        onChange={(e) => calcProductGramCost(parseInt(e.target.value))}>
                        {product.purchase_options.map(o => <option value={o.id}
                        >
                            {o.is_relevant??true ? <></> : '! '}{o.name} {o.price} ₽./{o.unit?.short} ({o.distributor?.name})
                        </option>
                        )}
                    </FormSelect>
            </td>
            <td className="d-sm-none d-md-table-cell">{product.gramCost.toFixed(2)} ₽/г.</td>
            <td className="d-sm-none d-md-table-cell">{product.weight.toFixed(2)} г.</td>
            <td>{(product.weight*product.gramCost).toFixed(2)} ₽</td>
        </tr>
    )
}
export default ProductCostCalculator;
