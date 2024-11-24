import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructDishGroupDishForm, DishGroupDishFormState } from '../../../models/dish/DishGroupFormState'
import { useContext, useState } from 'react'
import { dishFormContext } from '../../../context/dish/DishFormContext'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useDishSelect from '../../../hooks/tableSelect/useDishSelect';
import { dishGroupFormContext } from '../../../context/dish/DishGroupFormContext'
import DishGroupDishForm from './DishGroupDishForm';

function DishGroupDishFormList() {

  const { 
    addDishGroupDishForm, 
    removeAllDishGroupDishForms,
    setDishGroupDishFormState,
    formState,
    dishes,
  } = useContext(dishGroupFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllDishGroupDishForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<DishGroupDishFormState>()
  
  function setDishGroupDishId(id: number){
    if(!activeForm) return
    if(!formState.dishGroupDishForms.find(f=>f.key==activeForm.key))
      addDishGroupDishForm(dishes.find(i=>i.id==id))
    else
      setDishGroupDishFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useDishSelect(
    dishes.filter(
      d=>formState.dishGroupDishForms.find(f=>f.id==d.id)==undefined
    ), 
    setDishGroupDishId, activeForm?.id??0
  )
   
  function openSelect(form:DishGroupDishFormState){
    setActiveForm(form)
    showSelect()
  }  

  return (
    <>
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.dishGroupDishForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishGroupDishForm formState={fs}/>
            </div>
          )
      }
      <div className="d-flex flex-row-reverse">

        <TooltipButton
          tooltip='добавить ингредиент'
          variant='success'
          onClick={()=>openSelect(constructDishGroupDishForm())}
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

export default DishGroupDishFormList;