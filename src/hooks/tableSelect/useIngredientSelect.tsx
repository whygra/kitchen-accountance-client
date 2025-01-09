import { useState } from "react"
import IngredientsTableItem from "../../views/ingredient/list/IngredientsTableItem"
import ModalWrapper from "../../views/shared/ModalWrapper"
import TableSelect from "../../views/shared/selectCreateGroup/TableSelect"
import useIngredientsTableHeader from "../useIngredientsTableHeader"
import { IngredientDTO } from "../../api/ingredients"
import { IngredientField } from "../sort/useSortIngredients"


export default function useIngredientSelect(
  items: IngredientDTO[],
  setId:(id:number)=>void,
  selectedId: number,
  fieldsToExclude?: IngredientField[],
){

    const [displaySelect, setDisplaySelect] = useState(false)
    
    function showSelect() {
        setDisplaySelect(true)
    }

    function selectId(id: number){
        setId(id)
        setDisplaySelect(false)
    }

    // уникальные типы из коллекции ингредиентов
    const types = items.map(i=>i.type!).filter((t, i, arr)=>arr.indexOf(t)==i)
    
    const selectFilter = useIngredientsTableHeader(types, true, fieldsToExclude)
    const filteredItems = items
    .filter(selectFilter.getPredicate())
    .sort(selectFilter.getComparer())

    const modalSelect = <ModalWrapper show={displaySelect} onHide={()=>setDisplaySelect(false)}>
      <div className="disable-links">
      <TableSelect
      header={selectFilter.header}
      constructRow={(p)=><IngredientsTableItem ingredient={p}/>}
      selectedId={selectedId}
      setId={selectId}
      items={filteredItems}
    />
      </div>
  </ModalWrapper>

  return {modalSelect, showSelect}
}