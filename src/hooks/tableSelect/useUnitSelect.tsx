import { useState } from "react"
import ProductsTableItem from "../../views/product/list/ProductsTableItem"
import ModalWrapper from "../../views/shared/ModalWrapper"
import TableSelect from "../../views/shared/selectCreateGroup/TableSelect"
import useProductsTableHeader from "../useProductsTableHeader"
import { ProductDTO } from "../../api/products"


export default function useProductSelect(
    items: ProductDTO[],
    setId:(id:number)=>void,
    selectedId: number
){

    const [displaySelect, setDisplaySelect] = useState(false)
    
    function showSelect() {
        setDisplaySelect(true)
    }

    function selectId(id: number){
        setId(id)
        setDisplaySelect(false)
    }

    const selectFilter = useProductsTableHeader()
    const filteredItems = items
      .filter(selectFilter.getPredicate())
      .sort(selectFilter.getComparer())

    const modalSelect = <ModalWrapper show={displaySelect} onHide={()=>setDisplaySelect(false)}>
      <div className="disable-links">
      <TableSelect
      header={selectFilter.header}
      constructRow={(p)=><ProductsTableItem product={p}/>}
      selectedId={selectedId}
      setId={selectId}
      items={filteredItems}
      />
      </div>
      
  </ModalWrapper>

  return {modalSelect, showSelect}
}