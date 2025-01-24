import { Form } from 'react-bootstrap'
import { constructIngredientCategoryIngredientForm, IngredientCategoryIngredientFormState } from '../../../models/ingredient/IngredientCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientCategoryFormContext } from '../../../context/forms/ingredient/IngredientCategoryFormContext';
import IngredientCategoryIngredientForm from './IngredientCategoryIngredientForm';
import FormListButtons from '../../shared/FormListButtons';
import { useHotkeys } from 'react-hotkeys-hook';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function IngredientCategoryIngredientFormList() {

  const { 
    addIngredientCategoryIngredientForm, 
    removeAllIngredientCategoryIngredientForms,
    setIngredientCategoryIngredientFormState,
    removeIngredientCategoryIngredientForm,
    formState,
    ingredients,
  } = useContext(ingredientCategoryFormContext);

  const { hideModal} = useContext(appContext)

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
  
  useFormHotkeys(
    ()=>openSelect(constructIngredientCategoryIngredientForm()),
    ()=>removeIngredientCategoryIngredientForm(
      formState.ingredientCategoryIngredientForms[formState.ingredientCategoryIngredientForms.length-1].key
    )
  )

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