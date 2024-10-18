import { PurchaseOptionDTO } from "../../../api/purchaseOptions";

interface PurchaseOptionGramCostProps{
    purchaseOption: PurchaseOptionDTO
}

function PurchaseOptionGramCost({purchaseOption}:PurchaseOptionGramCostProps) {
    return(
        <>
            {(purchaseOption.price/purchaseOption.net_weight).toFixed(3)}
        </>
    )
}
export default PurchaseOptionGramCost;
