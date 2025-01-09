import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import IngredientProductForm from './IngredientProductForm'
import { v4 as uuid } from "uuid";
import { IngredientProductFormState } from '../../../models/ingredient/IngredientFormState'
import { useContext, useState } from 'react'
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext'
import ConfirmationDialog from '../../shared/ConfirmationDialog'
import { appContext } from '../../../context/AppContextProvider'
import TooltipButton from '../../shared/TooltipButton'
import BtnAskConfirmation from '../../shared/BtnAskConfirmation'
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import FormListButtons from '../../shared/FormListButtons';

function IngredientProductFormList() {

  const { 
    addIngredientProductForm, 
    removeAllIngredientProductForms,
    setIngredientProductFormState,
    formState,
    products
  } = useContext(ingredientContext);
    
  const [activeForm, setActiveForm] = useState<IngredientProductFormState>()
  
  function setProductId(id: number){
    if(!activeForm) return
    setIngredientProductFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useProductSelect(products, setProductId, activeForm?.id??0)
   
  function openSelect(form:IngredientProductFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <div>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.ingredientProductForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <IngredientProductForm openSelect={openSelect} formState={formState}/>
          </div>)
      }
      
      <FormListButtons
        addFn={addIngredientProductForm}
        deleteAllFn={removeAllIngredientProductForms}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </div>
  )
}

export default IngredientProductFormList;