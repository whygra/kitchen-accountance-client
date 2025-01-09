import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructDishCategoryDishForm, DishCategoryDishFormState } from '../../../models/dish/DishCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useDisheselect from '../../../hooks/tableSelect/useDishSelect';
import { dishCategoryFormContext } from '../../../context/dish/DishCategoryFormContext';
import DishCategoryDishForm from './DishCategoryDishForm';
import FormListButtons from '../../shared/FormListButtons';

function DishCategoryDishFormList() {

  const { 
    addDishCategoryDishForm, 
    removeAllDishCategoryDishForms,
    setDishCategoryDishFormState,
    formState,
    dishes,
  } = useContext(dishCategoryFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllDishCategoryDishForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<DishCategoryDishFormState>()
  
  function setDishCategoryDishId(id: number){
    if(!activeForm) return
    
    if(!formState.dishCategoryDishForms.find(f=>f.key==activeForm.key))
      addDishCategoryDishForm(dishes.find(i=>i.id==id))
    else
      setDishCategoryDishFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useDisheselect(
    dishes.filter(i=>formState.dishCategoryDishForms.find(f=>f.id==i.id)==undefined), 
    setDishCategoryDishId, 
    activeForm?.id??0
  )
   
  function openSelect(form:DishCategoryDishFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <div>
      
      <Form.Label><b>Блюда:</b></Form.Label>
      {
        formState.dishCategoryDishForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishCategoryDishForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructDishCategoryDishForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    <div className='links-disabled'>
    {modalSelect}
    </div>
    </>
  )
}

export default DishCategoryDishFormList;