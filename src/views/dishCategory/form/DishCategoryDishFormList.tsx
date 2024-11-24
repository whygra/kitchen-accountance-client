import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructDishCategoryDishForm, DishCategoryDishFormState } from '../../../models/dish/DishCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useDisheselect from '../../../hooks/tableSelect/useDishSelect';
import { dishCategoryFormContext } from '../../../context/dish/DishCategoryFormContext';
import DishCategoryDishForm from './DishCategoryDishForm';

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
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.dishCategoryDishForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishCategoryDishForm formState={fs}/>
            </div>
          )
      }
      <div className="d-flex flex-row-reverse">

        <TooltipButton
          tooltip='добавить ингредиент'
          variant='success'
          onClick={()=>openSelect(constructDishCategoryDishForm())}
        ><i className='bi bi-plus-lg'/></TooltipButton>

        <BtnAskConfirmation
          tooltip='исключить все'
          variant="danger"
          onConfirm={deleteAll}
          prompt='исключить все ингредиенты? несохраненные данные будут утеряны'
        ><i className='bi bi-x-lg'/></BtnAskConfirmation>
      </div>
    </Container>
    {modalSelect}
    </>
  )
}

export default DishCategoryDishFormList;