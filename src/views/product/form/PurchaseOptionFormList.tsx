import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './PurchaseOptionForm'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { productFormContext } from '../../../context/forms/product/ProductFormContext';
import TooltipButton from '../../shared/TooltipButton';
import { constructProductPurchaseOptionForm, PurchaseOptionFormState } from '../../../models/product/ProductFormState';
import usePurchaseOptionSelect from '../../../hooks/tableSelect/usePurchaseOptionSelect';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function PurchaseOptionFormList() {

  const {
    addPurchaseOptionForm,
    setPurchaseOptionFormState,
    removeAllPurchaseOptionForms: removeAllForms,
    removePurchaseOptionForm,
    purchaseOptions,
    formState
  } = useContext(productFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllForms()
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

  const [activeForm, setActiveForm] = useState<PurchaseOptionFormState>()

  function setPurchaseOptionId(id: number){
    if(!activeForm) return
    if(!formState.purchaseOptionForms.find(f=>f.key==activeForm.key))
      addPurchaseOptionForm({...activeForm, id:id})
    else
      setPurchaseOptionFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = usePurchaseOptionSelect(
    // скрыть выбранные позиции закупки
    purchaseOptions.filter(o=>
      formState.purchaseOptionForms.findIndex(f=>f.id==o.id)==-1 
      || o.id == activeForm?.id), 
    setPurchaseOptionId, activeForm?.id??0
  )
    
  function openSelect(form:PurchaseOptionFormState){
    setActiveForm(form)
    showSelect()
  }
  
  useFormHotkeys(
    ()=>openSelect(constructProductPurchaseOptionForm()),
    ()=>removePurchaseOptionForm(
      formState.purchaseOptionForms[formState.purchaseOptionForms.length-1].key
    )
  )

  return (
    <>
    <div> 
      <Form.Label><b>Позиции закупки:</b></Form.Label>
      {
        formState.purchaseOptionForms.map(formState => 
          <div key={`${formState.key}`}>
            <PurchaseOptionForm
              openSelect={openSelect}
              formState={formState}/>
          </div>)
      }

      <FormListButtons
        addFn={()=>openSelect(constructProductPurchaseOptionForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    <div className='links-disabled'>
    {modalSelect}
    </div>

    </>
  )
}

export default PurchaseOptionFormList;