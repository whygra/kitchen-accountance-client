import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructIngredientTagIngredientForm, IngredientTagIngredientFormState } from '../../../models/ingredient/IngredientTagFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientTagFormContext } from '../../../context/forms/nomenclature/ingredient/IngredientTagFormContext';
import IngredientTagIngredientForm from './IngredientTagIngredientForm';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function IngredientTagIngredientFormList() {

  const { 
    addIngredientTagIngredientForm, 
    removeAllIngredientTagIngredientForms,
    setIngredientTagIngredientFormState,
    removeIngredientTagIngredientForm,
    formState,
    ingredients,
  } = useContext(ingredientTagFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllIngredientTagIngredientForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<IngredientTagIngredientFormState>()
  
  function setIngredientTagIngredientId(id: number){
    if(!activeForm) return
    
    if(!formState.ingredientTagIngredientForms.find(f=>f.key==activeForm.key))
      addIngredientTagIngredientForm(ingredients.find(i=>i.id==id))
    else
      setIngredientTagIngredientFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(
    ingredients.filter(i=>formState.ingredientTagIngredientForms.find(f=>f.id==i.id)==undefined), 
    setIngredientTagIngredientId, 
    activeForm?.id??0
  )
   
  function openSelect(form:IngredientTagIngredientFormState){
    setActiveForm(form)
    showSelect()
  }

  useFormHotkeys(
    ()=>openSelect(constructIngredientTagIngredientForm()),
    ()=>removeIngredientTagIngredientForm(
      formState.ingredientTagIngredientForms[formState.ingredientTagIngredientForms.length-1].key
    )
  )

  return (
    <>
    <div>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientTagIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <IngredientTagIngredientForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructIngredientTagIngredientForm())}
        deleteAllFn={deleteAll}
      />
    </div>
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default IngredientTagIngredientFormList;