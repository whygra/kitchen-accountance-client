import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PurchaseActItemForm from './PurchaseActItemForm'
import { PurchaseActItemFormState } from '../../../../models/storage/PurchaseActFormState'
import { useContext, useState } from 'react'
import { purchaseActContext } from '../../../../context/forms/storage/PurchaseActFormContext'
import usePurchaseOptionSelect from '../../../../hooks/tableSelect/usePurchaseOptionSelect';
import FormListButtons from '../../../shared/FormListButtons';
import useFormHotkeys from '../../../../hooks/useFormHotkeys'

function PurchaseActItemFormList() {

  const {
    addItemForm, 
    removeAllItemForms,
    setItemFormState,
    removeItemForm,
    formState,
  } = useContext(purchaseActContext);
    
  const [activeForm, setActiveForm] = useState<PurchaseActItemFormState>()
  
  function setItemId(id: number){
    if(!activeForm) return
    const item = items.find(i=>i.id==id)
    if(!item) return
    setItemFormState({...activeForm, id:item.id, price:item.price, net_weight:item.net_weight})
  }
  
  const items = formState.distributor.purchase_options ?? []
  const {modalSelect, showSelect} = usePurchaseOptionSelect(items.filter(i=>formState.itemForms.find(f=>f.id==i.id)==undefined||i.id==activeForm?.id), setItemId, activeForm?.id??0)
   
  function openSelect(form:PurchaseActItemFormState){
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
      
      <Form.Label><b>Позиции:</b></Form.Label>
      {
        formState.itemForms
          .map(formState => 
          <div key={`${formState.key}`}>
            <PurchaseActItemForm openSelect={openSelect} formState={formState}/>
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

export default PurchaseActItemFormList;