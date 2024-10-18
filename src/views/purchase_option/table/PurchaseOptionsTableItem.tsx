import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"

interface PurchaseOptionsTableItemProps {
    purchaseOption: PurchaseOptionDTO
    fieldsToExclude?: PurchaseOptionField[]
}

function PurchaseOptionsTableItem({purchaseOption: o, fieldsToExclude}:PurchaseOptionsTableItemProps) {
    
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Distributor)
                ? <></>
                : <td
                    className=' d-none d-md-table-cell'
                    width={2}>{o.distributor?.name}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Code)
                ? <></>
                : <td
                    className='  d-none d-lg-table-cell'
                    width={1}>{o.code}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Name)
                ? <></>
                : <td
                    className=' '
                    width={2}><Link to={`/purchase-options/details/${o.id}`}>{o.name}</Link></td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Product)
                ? <></>
                : <td
                    className='  d-none d-md-table-cell'
                    width={2}>{`${o.products&&o.products.length > 0 ?o.products[0].name :''}${(o.products?.length??0)>1?'...':''}`}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Unit)
                ? <></>
                : <td
                    className='  d-none d-lg-table-cell'
                    width={1}>{o.unit.long}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.NetWeight)
                ? <></>
                : <td
                    className='  d-none d-md-table-cell'
                    width={2}>{o.net_weight} г.</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==PurchaseOptionField.Price)
                ? <></>
                : <td
                    className=' '
                    width={2}>{o.price}₽</td>
            }
            
        </>
    )
}

export default PurchaseOptionsTableItem