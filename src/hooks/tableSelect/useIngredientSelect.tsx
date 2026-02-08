import { useEffect, useState } from "react"
import IngredientsTableItem from "../../views/ingredient/list/IngredientsTableItem"
import ModalWrapper from "../../views/shared/ModalWrapper"
import TableSelect from "../../views/shared/selectCreateGroup/TableSelect"
import useIngredientsTableHeader from "../useIngredientsTableHeader"
import { IngredientDTO, IngredientTypeDTO } from "../../api/nomenclature/ingredients"
import { IngredientField } from "../sort/useSortIngredients"
import { getIngredientTypes } from "../../api/nomenclature/ingredientTypes"


export default function useIngredientSelect(
  items: IngredientDTO[],
  setId:(id:number)=>void,
  selectedId: number,
  fieldsToExclude?: IngredientField[],
){

  const [types, setTypes] = useState<IngredientTypeDTO[]>()
  useEffect(()=>{loadTypes()},[])
    const [displaySelect, setDisplaySelect] = useState(false)
    
    function showSelect() {
        setDisplaySelect(true)
    }

    async function loadTypes(){
      setTypes(await getIngredientTypes()??undefined)
    }

    function selectId(id: number){
        setId(id)
        setDisplaySelect(false)
    }
    
    const selectFilter = useIngredientsTableHeader({ingredientTypes: types, filtersOpen:true, fieldsToExclude})
    const filteredItems = items
    .filter(selectFilter.getPredicate())
    .sort(selectFilter.getComparer())

    const modalSelect = <ModalWrapper show={displaySelect} onHide={()=>setDisplaySelect(false)}>
      <div className="links-disabled">
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