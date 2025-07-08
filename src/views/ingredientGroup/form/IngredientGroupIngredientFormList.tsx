import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructIngredientGroupIngredientForm, IngredientGroupIngredientFormState } from '../../../models/ingredient/IngredientGroupFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientGroupFormContext } from '../../../context/forms/nomenclature/ingredient/IngredientGroupFormContext';
import IngredientGroupIngredientForm from './IngredientGroupIngredientForm';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function IngredientGroupIngredientFormList() {

  const { 
    addIngredientGroupIngredientForm, 
    removeAllIngredientGroupIngredientForms,
    setIngredientGroupIngredientFormState,
    removeIngredientGroupIngredientForm,
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

  useFormHotkeys(
    ()=>openSelect(constructIngredientGroupIngredientForm()),
    ()=>removeIngredientGroupIngredientForm(
      formState.ingredientGroupIngredientForms[formState.ingredientGroupIngredientForms.length-1].key
    )
  )

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