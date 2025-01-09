import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import DishIngredientForm from './DishIngredientForm'
import { v4 as uuid } from "uuid";
import { DishIngredientFormState } from '../../../models/dish/DishFormState'
import { useContext, useState } from 'react'
import { dishFormContext } from '../../../context/dish/DishFormContext'
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import { DishField } from '../../../hooks/sort/useSortDishes';
import TableSelect from '../../shared/selectCreateGroup/TableSelect';
import DishesTableItem from '../list/DishesTableItem';
import IngredientsTableItem from '../../ingredient/list/IngredientsTableItem';
import ModalWrapper from '../../shared/ModalWrapper';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import { IngredientProductFormState } from '../../../models/ingredient/IngredientFormState';
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import FormListButtons from '../../shared/FormListButtons';

function DishIngredientFormList() {

  const { 
    addDishIngredientForm, 
    removeAllDishIngredientForms,
    setDishIngredientFormState,
    formState,
    ingredients,
    ingredientTypes
  } = useContext(dishFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllDishIngredientForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<DishIngredientFormState>()
  
  function setDishIngredientId(id: number){
    if(!activeForm) return
    const ingredient = ingredients.find(i=>i.id==id)
    setDishIngredientFormState({
      ...activeForm, 
      id: id, 
      isItemMeasured:ingredient?.is_item_measured??false
    })
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(ingredients, setDishIngredientId, activeForm?.id??0)
   
  function openSelect(form:DishIngredientFormState){
    setActiveForm(form)
    showSelect()
  }  

  return (
    <>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.dishIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishIngredientForm openSelect={openSelect}  formState={fs}/>
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