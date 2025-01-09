import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructIngredientGroupIngredientForm, IngredientGroupIngredientFormState } from '../../../models/ingredient/IngredientGroupFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientGroupFormContext } from '../../../context/ingredient/IngredientGroupFormContext';
import IngredientGroupIngredientForm from './IngredientGroupIngredientForm';
import FormListButtons from '../../shared/FormListButtons';

function IngredientGroupIngredientFormList() {

  const { 
    addIngredientGroupIngredientForm, 
    removeAllIngredientGroupIngredientForms,
    setIngredientGroupIngredientFormState,
    formState,
    ingredients,
  } = useContext(ingredientGroupFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllIngredientGroupIngredientForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<IngredientGroupIngredientFormState>()
  
  function setIngredientGroupIngredientId(id: number){
    if(!activeForm) return
    
    if(!formState.ingredientGroupIngredientForms.find(f=>f.key==activeForm.key))
      addIngredientGroupIngredientForm(ingredients.find(i=>i.id==id))
    else
      setIngredientGroupIngredientFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(
    ingredients.filter(i=>formState.ingredientGroupIngredientForms.find(f=>f.id==i.id)==undefined), 
    setIngredientGroupIngredientId, 
    activeForm?.id??0
  )
   
  function openSelect(form:IngredientGroupIngredientFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <div>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientGroupIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <IngredientGroupIngredientForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructIngredientGroupIngredientForm())}
        deleteAllFn={deleteAll}
      />
    </div>
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default IngredientGroupIngredientFormList;