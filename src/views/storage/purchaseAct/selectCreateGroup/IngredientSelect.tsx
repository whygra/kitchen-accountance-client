import { ReactElement, useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import { IngredientDTO, IngredientTypeDTO, getIngredientsWithItems } from '../../../api/nomenclature/ingredients';
import TableSelect from '../../shared/selectCreateGroup/TableSelect';
import ModalWrapper from '../../shared/ModalWrapper';
import IngredientsTableItem from '../list/PurchaseActTableItem';

interface IngredientSelectProps {
  header: ReactElement
  ingredientId : number
  setIngredientId : (id : number) => void
  ingredients : IngredientDTO[]
  predicate : (i:IngredientDTO)=>boolean
  comparer : (i1:IngredientDTO, i2:IngredientDTO)=>number
}

function IngredientSelect({header, ingredientId, setIngredientId, ingredients, predicate, comparer} : IngredientSelectProps) {
  const[displayTable, setDisplayTable] = useState(false)

  const selected = ingredients.find(i => i.id == ingredientId)!
  const filtered = ingredients
    .filter(predicate)
    .sort(comparer)
  
  return (
    <>
    <Button
      variant='none'
      onClick={()=>setDisplayTable(true)}
      >
      {selected.id} {selected.name} {selected.type?.name}  
    </Button>
      <ModalWrapper show={displayTable} onHide={()=>setDisplayTable(false)}>
        <TableSelect
          constructRow={i=><IngredientsTableItem ingredient={i}/>}
          header={header}
          items={filtered}
          selectedId={ingredientId}
          setId={setIngredientId}
        />
      </ModalWrapper>
    </>
  )
}

export default IngredientSelect;