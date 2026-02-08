import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import DishIngredientForm from './DishIngredientForm'
import { DishIngredientFormState } from '../../../models/dish/DishFormState'
import { useContext, useState } from 'react'
import { dishFormContext } from '../../../context/forms/nomenclature/dish/DishFormContext'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function DishIngredientFormList() {

  const { 
    addDishIngredientForm, 
    removeAllDishIngredientForms,
    setDishIngredientFormState,
    removeDishIngredientForm,
    formState,
    ingredients
  } = useContext(dishFormContext);


  function deleteAll(){
    removeAllDishIngredientForms()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<DishIngredientFormState>()
  
  function setDishIngredientId(id: number){
    if(!activeForm) return
    const ingredient = ingredients.find(i=>i.id==id)
    setDishIngredientFormState({
      ...activeForm, 
      id: id, 
      isItemMeasured:ingredient?.is_item_measured??false,
      itemWeight: ingredient?.item_weight ?? 1
    })
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(ingredients, setDishIngredientId, activeForm?.id??0)
   
  function openSelect(form:DishIngredientFormState){
    setActiveForm(form)
    showSelect()
  }    
  
  useFormHotkeys(
    ()=>addDishIngredientForm(),
    ()=>removeDishIngredientForm(
      formState.dishIngredientForms[formState.dishIngredientForms.length-1].key
    )
  )

  return (
    <>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.dishIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishIngredientForm openSelect={openSelect} formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={addDishIngredientForm}
        deleteAllFn={deleteAll}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default DishIngredientFormList;