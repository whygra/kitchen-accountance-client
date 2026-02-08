import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructDishTagDishForm, DishTagDishFormState } from '../../../models/dish/DishTagFormState'
import { useContext, useState } from 'react'
import { dishFormContext } from '../../../context/forms/nomenclature/dish/DishFormContext'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useDishSelect from '../../../hooks/tableSelect/useDishSelect';
import { dishTagFormContext } from '../../../context/forms/nomenclature/dish/DishTagFormContext'
import DishTagDishForm from './DishTagDishForm';
import FormListButtons from '../../shared/FormListButtons';
import { useHotkeys } from 'react-hotkeys-hook';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function DishTagDishFormList() {

  const { 
    addDishTagDishForm, 
    removeAllDishTagDishForms,
    setDishTagDishFormState,
    removeDishTagDishForm,
    formState,
    dishes,
  } = useContext(dishTagFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllDishTagDishForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<DishTagDishFormState>()
  
  function setDishTagDishId(id: number){
    if(!activeForm) return
    if(!formState.dishTagDishForms.find(f=>f.key==activeForm.key))
      addDishTagDishForm(dishes.find(i=>i.id==id))
    else
      setDishTagDishFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useDishSelect(
    dishes.filter(
      d=>formState.dishTagDishForms.find(f=>f.id==d.id)==undefined
    ), 
    setDishTagDishId, activeForm?.id??0
  )
   
  function openSelect(form:DishTagDishFormState){
    setActiveForm(form)
    showSelect()
  }    
  
  useFormHotkeys(
    ()=>openSelect(constructDishTagDishForm()),
    ()=>removeDishTagDishForm(
      formState.dishTagDishForms[formState.dishTagDishForms.length-1].key
    )
  )

  return (
    <>
    <div>
      
      <Form.Label><b>Блюда:</b></Form.Label>
      {
        formState.dishTagDishForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <DishTagDishForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructDishTagDishForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    <div className='links-disabled'>
    {modalSelect}
    </div>
    </>
  )
}

export default DishTagDishFormList;