import { useState } from "react"
import PurchaseOptionsTableItem from "../../views/purchase_option/table/PurchaseOptionsTableItem"
import ModalWrapper from "../../views/shared/ModalWrapper"
import TableSelect from "../../views/shared/selectCreateGroup/TableSelect"
import usePurchaseOptionsTableHeader from "../usePurchaseOptionsTableHeader"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"
import { PurchaseOptionField } from "../sort/useSortPurchaseOptions"


export default function usePurchaseOptionSelect(
    items: PurchaseOptionDTO[],
    setId:(id:number)=>void,
    selectedId: number,
    fieldsToExclude?: PurchaseOptionField[]
){

    const [displaySelect, setDisplaySelect] = useState(false)
    
    function showSelect() {
        setDisplaySelect(true)
    }

    function selectId(id: number){
        setId(id)
        setDisplaySelect(false)
    }

    const selectFilter = usePurchaseOptionsTableHeader(true, fieldsToExclude)
    const filteredItems = items
      .filter(selectFilter.getPredicate())
      .sort(selectFilter.getComparer())

    const modalSelect = <ModalWrapper show={displaySelect} onHide={()=>setDisplaySelect(false)}>
      <div className="links-disabled">
      <TableSelect
        header={selectFilter.header}
        constructRow={(o)=><PurchaseOptionsTableItem fieldsToExclude={fieldsToExclude} purchaseOption={o}/>}
        selectedId={selectedId}
        setId={selectId}
        items={filteredItems}
        />
      </div>
        
    </ModalWrapper>

  return {modalSelect, showSelect}
}