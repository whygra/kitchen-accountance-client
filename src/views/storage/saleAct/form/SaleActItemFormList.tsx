import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import SaleActItemForm from './SaleActItemForm'
import { SaleActItemFormState } from '../../../../models/storage/SaleActFormState'
import { useContext, useState } from 'react'
import { saleActContext } from '../../../../context/forms/storage/SaleActFormContext'
import useDishSelect from '../../../../hooks/tableSelect/useDishSelect';
import FormListButtons from '../../../shared/FormListButtons';
import useFormHotkeys from '../../../../hooks/useFormHotkeys'

function SaleActItemFormList() {

  const { 
    addItemForm, 
    removeAllItemForms,
    setItemFormState,
    removeItemForm,
    formState,
    dishes
  } = useContext(saleActContext);
    
  const [activeForm, setActiveForm] = useState<SaleActItemFormState>()
  
  function setItem(id: number){
    if(!activeForm) return
    setItemFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useDishSelect(
    dishes.filter(i=>formState.itemForms.find(f=>f.id==i.id)==undefined), setItem, activeForm?.id??0
  )
   
  function openSelect(form:SaleActItemFormState){
    setActiveForm(form)
    showSelect()
  }
  
  useFormHotkeys(
    ()=>addItemForm(),
    ()=>removeItemForm(
      formState.itemForms[formState.itemForms.length-1].key
    )
  )

  return (
    <>
      <Form.Label><b>Блюдоы:</b></Form.Label>
      {
        formState.itemForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <SaleActItemForm openSelect={openSelect} formState={formState}/>
          </div>)
      }
      
      <FormListButtons
        addFn={addItemForm}
        deleteAllFn={removeAllItemForms}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default SaleActItemFormList;