import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import InventoryActIngredientForm from './InventoryActIngredientForm'
import { InventoryActIngredientFormState } from '../../../../models/storage/InventoryActFormState'
import { useContext, useState } from 'react'
import { inventoryActContext } from '../../../../context/forms/storage/InventoryActFormContext'
import useIngredientSelect from '../../../../hooks/tableSelect/useIngredientSelect';
import FormListButtons from '../../../shared/FormListButtons';
import useFormHotkeys from '../../../../hooks/useFormHotkeys'

function InventoryActIngredientFormList() {

  const { 
    addIngredientForm, 
    removeAllIngredientForms,
    setIngredientFormState,
    removeIngredientForm,
    formState,
    ingredients
  } = useContext(inventoryActContext);
    
  const [activeForm, setActiveForm] = useState<InventoryActIngredientFormState>()
  
  function setIngredient(id: number){
    if(!activeForm) return
    const itemWeight = ingredients.find(i=>i.id == id)?.item_weight ?? 1
    setIngredientFormState({...activeForm, id:id, itemWeight:itemWeight})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(ingredients.filter(i=>formState.ingredientForms.find(f=>f.id==i.id)==undefined), setIngredient, activeForm?.id??0)
   
  function openSelect(form:InventoryActIngredientFormState){
    setActiveForm(form)
    showSelect()
  }
  
  useFormHotkeys(
    ()=>addIngredientForm(),
    ()=>removeIngredientForm(
      formState.ingredientForms[formState.ingredientForms.length-1].key
    )
  )

  return (
    <>
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <InventoryActIngredientForm openSelect={openSelect} formState={formState}/>
          </div>)
      }
      
      <FormListButtons
        addFn={addIngredientForm}
        deleteAllFn={removeAllIngredientForms}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default InventoryActIngredientFormList;