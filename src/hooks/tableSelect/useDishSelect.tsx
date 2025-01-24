import { useState } from "react"
import DishesTableItem from "../../views/dish/list/DishesTableItem"
import ModalWrapper from "../../views/shared/ModalWrapper"
import TableSelect from "../../views/shared/selectCreateGroup/TableSelect"
import useDishesTableHeader from "../useDishesTableHeader"
import { DishDTO } from "../../api/dishes"
import { DishField } from "../sort/useSortDishes"


export default function useDisheselect(
  items: DishDTO[],
  setId:(id:number)=>void,
  selectedId: number,
  fieldsToExclude?: DishField[],
){

    const [displaySelect, setDisplaySelect] = useState(false)
    
    function showSelect() {
        setDisplaySelect(true)
    }

    function selectId(id: number){
        setId(id)
        setDisplaySelect(false)
    }

    
    const selectFilter = useDishesTableHeader(true, fieldsToExclude)
    const filteredItems = items
    .filter(selectFilter.getPredicate())
    .sort(selectFilter.getComparer())

    const modalSelect = <ModalWrapper show={displaySelect} onHide={()=>setDisplaySelect(false)}>
      <div className="links-disabled">
      <TableSelect
      header={selectFilter.header}
      constructRow={(p)=><DishesTableItem dish={p}/>}
      selectedId={selectedId}
      setId={selectId}
      items={filteredItems}
    />
    </div>
      
  </ModalWrapper>

  return {modalSelect, showSelect}
}