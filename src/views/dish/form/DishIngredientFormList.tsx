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

  function confirmDeleteAll(){
    showModal(
      <ConfirmationDialog 
        prompt='удалить все позиции закупки? несохраненные данные будут утеряны'
        onCancel={hideModal} 
        onConfirm={deleteAll}
      />
    )
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
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.dishIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishIngredientForm openSelect={openSelect}  formState={fs}/>
            </div>
          )
      }
      <div className="d-flex flex-row-reverse">

        <TooltipButton
          tooltip='добавить ингредиент'
          variant='success'
          onClick={addDishIngredientForm}
        ><i className='bi bi-plus-lg'/></TooltipButton>

        <BtnAskConfirmation
          tooltip='удалить все'
          variant="danger"
          onConfirm={confirmDeleteAll}
          prompt='удалить все ингредиенты? несохраненные данные будут потеряны'
        ><i className='bi bi-x-lg'/></BtnAskConfirmation>
      </div>
    </Container>
    {modalSelect}
    </>
  )
}

export default DishIngredientFormList;