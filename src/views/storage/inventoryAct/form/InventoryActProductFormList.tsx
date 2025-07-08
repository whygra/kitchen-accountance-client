import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import InventoryActProductForm from './InventoryActProductForm'
import { InventoryActProductFormState } from '../../../../models/storage/InventoryActFormState'
import { useContext, useState } from 'react'
import { inventoryActContext } from '../../../../context/forms/storage/InventoryActFormContext'
import useProductSelect from '../../../../hooks/tableSelect/useProductSelect';
import FormListButtons from '../../../shared/FormListButtons';
import useFormHotkeys from '../../../../hooks/useFormHotkeys'

function InventoryActProductFormList() {

  const { 
    addProductForm, 
    removeAllProductForms,
    setProductFormState,
    removeProductForm,
    formState,
    products
  } = useContext(inventoryActContext);
    
  const [activeForm, setActiveForm] = useState<InventoryActProductFormState>()
  
  function setProductId(id: number){
    if(!activeForm) return
    setProductFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useProductSelect(products.filter(i=>formState.productForms.find(f=>f.id==i.id)==undefined), setProductId, activeForm?.id??0)
   
  function openSelect(form:InventoryActProductFormState){
    setActiveForm(form)
    showSelect()
  }
  
  useFormHotkeys(
    ()=>addProductForm(),
    ()=>removeProductForm(
      formState.productForms[formState.productForms.length-1].key
    )
  )

  return (
    <>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.productForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <InventoryActProductForm openSelect={openSelect} formState={formState}/>
          </div>)
      }
      
      <FormListButtons
        addFn={addProductForm}
        deleteAllFn={removeAllProductForms}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default InventoryActProductFormList;