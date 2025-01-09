import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructIngredientCategoryIngredientForm, IngredientCategoryIngredientFormState } from '../../../models/ingredient/IngredientCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientCategoryFormContext } from '../../../context/ingredient/IngredientCategoryFormContext';
import IngredientCategoryIngredientForm from './IngredientCategoryIngredientForm';
import FormListButtons from '../../shared/FormListButtons';

function IngredientCategoryIngredientFormList() {

  const { 
    addIngredientCategoryIngredientForm, 
    removeAllIngredientCategoryIngredientForms,
    setIngredientCategoryIngredientFormState,
    formState,
    ingredients,
  } = useContext(ingredientCategoryFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllIngredientCategoryIngredientForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<IngredientCategoryIngredientFormState>()
  
  function setIngredientCategoryIngredientId(id: number){
    if(!activeForm) return
    
    if(!formState.ingredientCategoryIngredientForms.find(f=>f.key==activeForm.key))
      addIngredientCategoryIngredientForm(ingredients.find(i=>i.id==id))
    else
      setIngredientCategoryIngredientFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(
    ingredients.filter(i=>formState.ingredientCategoryIngredientForms.find(f=>f.id==i.id)==undefined), 
    setIngredientCategoryIngredientId, 
    activeForm?.id??0
  )
   
  function openSelect(form:IngredientCategoryIngredientFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <div>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientCategoryIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <IngredientCategoryIngredientForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        deleteAllFn={deleteAll}
        addFn={()=>openSelect(constructIngredientCategoryIngredientForm())}
      />
    </div>
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default IngredientCategoryIngredientFormList;