import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import WriteOffActIngredientForm from './WriteOffActIngredientForm'
import { WriteOffActIngredientFormState } from '../../../../models/storage/WriteOffActFormState'
import { useContext, useState } from 'react'
import { writeOffActContext } from '../../../../context/forms/storage/WriteOffActFormContext'
import useIngredientSelect from '../../../../hooks/tableSelect/useIngredientSelect';
import FormListButtons from '../../../shared/FormListButtons';
import useFormHotkeys from '../../../../hooks/useFormHotkeys'
import { InventoryActIngredientFormState } from '../../../../models/storage/InventoryActFormState'

function WriteOffActIngredientFormList() {

  const { 
    addIngredientForm, 
    removeAllIngredientForms,
    setIngredientFormState,
    removeIngredientForm,
    formState,
    ingredients
  } = useContext(writeOffActContext);
    
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
            <WriteOffActIngredientForm openSelect={openSelect} formState={formState}/>
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

export default WriteOffActIngredientFormList;