import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './ProductForm'
import { useContext, useEffect, useRef, useState } from 'react'
import { distributorFormContext } from '../../../context/forms/distributor/DistributorFormContext'
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { productFormContext } from '../../../context/forms/product/ProductFormContext';
import ProductForm from './ProductForm';
import { purchaseOptionFormContext } from '../../../context/forms/distributor/PurchaseOptionFormContext';
import TooltipButton from '../../shared/TooltipButton';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import usePagination from '../../../hooks/usePagination';
import { constructProductForm, ProductFormState } from '../../../models/PurchaseOptionFormState';
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import FormListButtons from '../../shared/FormListButtons';

function ProductFormList() {

  const {
    addProductForm,
    removeAllForms,
    setProductFormState,
    products,
    formState
  } = useContext(purchaseOptionFormContext);


  // границы среза коллекции, отображаемого на странице
  const {sliceLimits, nav} = usePagination(formState.productForms.length)

  function deleteAll(){
    removeAllForms()
  }

  function addForm(){
    openSelect(constructProductForm())
  }

  
  const [activeForm, setActiveForm] = useState<ProductFormState>()
  
  function setProductId(id: number){
    if(!activeForm) return
    if(formState.productForms.find(f=>f==activeForm)==undefined)
      addProductForm({...activeForm, id:id})
    else
      setProductFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useProductSelect(products, setProductId, activeForm?.id??0)
   
  function openSelect(form:ProductFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <div> 
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.productForms.slice(sliceLimits.start, sliceLimits.end).map(formState => 
          <div key={`${formState.key}`}>
            <ProductForm openSelect={openSelect} formState={formState}/>
          </div>)
      }

      {nav}
      <FormListButtons
        addFn={addForm}
        deleteAllFn={deleteAll}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </div>
  )
}

export default ProductFormList;