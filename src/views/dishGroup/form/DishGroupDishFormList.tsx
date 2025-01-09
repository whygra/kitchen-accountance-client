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
import FormListButtons from '../../shared/FormListButtons';

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
    <div>
      
      <Form.Label><b>Блюда:</b></Form.Label>
      {
        formState.dishGroupDishForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishGroupDishForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructDishGroupDishForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    <div className='links-disabled'>
    {modalSelect}
    </div>
    </>
  )
}

export default DishGroupDishFormList;