import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import IngredientIngredientForm from './IngredientIngredientForm'
import { IngredientIngredientFormState } from '../../../models/ingredient/IngredientFormState'
import { useContext, useState } from 'react'
import { ingredientContext } from '../../../context/forms/nomenclature/ingredient/IngredientFormContext'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys'

function IngredientIngredientFormList() {

  const { 
    addIngredientIngredientForm, 
    removeAllIngredientIngredientForms,
    setIngredientIngredientFormState,
    removeIngredientIngredientForm,
    formState,
    ingredients
  } = useContext(ingredientContext);
    
  const [activeForm, setActiveForm] = useState<IngredientIngredientFormState>()
  
  function setIngredientId(id: number){
    if(!activeForm) return
    setIngredientIngredientFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(
    ingredients.filter(i=>!(formState.ingredientIngredientForms.some(ii=>ii.id==i.id) || i.id==formState.id)), 
    setIngredientId, 
    activeForm?.id??0
  )
   
  function openSelect(form:IngredientIngredientFormState){
    setActiveForm(form)
    showSelect()
  }
  
  useFormHotkeys(
    ()=>addIngredientIngredientForm(),
    ()=>removeIngredientIngredientForm(
      formState.ingredientIngredientForms[formState.ingredientIngredientForms.length-1].key
    )
  )

  return (
    <div>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientIngredientForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <IngredientIngredientForm openSelect={openSelect} formState={formState}/>
          </div>)
      }
      
      <FormListButtons
        addFn={addIngredientIngredientForm}
        deleteAllFn={removeAllIngredientIngredientForms}
      />
      <div className='links-disabled'>
        {modalSelect}
      </div>
    </div>
  )
}

export default IngredientIngredientFormList;