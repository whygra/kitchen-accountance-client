import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './PurchaseOptionForm'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { productFormContext } from '../../../context/product/ProductFormContext';
import TooltipButton from '../../shared/TooltipButton';
import { constructProductPurchaseOptionForm, PurchaseOptionFormState } from '../../../models/product/ProductFormState';
import usePurchaseOptionSelect from '../../../hooks/tableSelect/usePurchaseOptionSelect';

function PurchaseOptionFormList() {

  const {
    addPurchaseOptionForm,
    setPurchaseOptionFormState,
    removeAllPurchaseOptionForms: removeAllForms,
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

  return (
    <>
    <Container> 
      <Form.Label><b>Позиции закупки:</b></Form.Label>
      {
        formState.purchaseOptionForms.map(formState => 
          <div key={`${formState.key}`}>
            <PurchaseOptionForm
              openSelect={openSelect}
              formState={formState}/>
          </div>)
      }

      <div className="d-flex flex-row-reverse mt-2">
        <TooltipButton
          tooltip='Добавить позицию'
          variant="success"
          onClick={()=>openSelect(constructProductPurchaseOptionForm())}
        ><i className='bi bi-plus-lg'/></TooltipButton>
        <TooltipButton
          tooltip='Удалить все'
          variant="danger" 
          onClick={confirmDeleteAll}
        ><i className='bi bi-x-lg'/></TooltipButton>
      </div>
    </Container>
    {modalSelect}
    </>
  )
}

export default PurchaseOptionFormList;