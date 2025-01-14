import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructProductCategoryProductForm, ProductCategoryProductFormState } from '../../../models/product/ProductCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import { productCategoryFormContext } from '../../../context/forms/product/ProductCategoryFormContext';
import ProductCategoryProductForm from './ProductCategoryProductForm';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import FormListButtons from '../../shared/FormListButtons';

function ProductCategoryProductFormList() {

  const { 
    addProductCategoryProductForm, 
    removeAllProductCategoryProductForms,
    setProductCategoryProductFormState,
    formState,
    products,
  } = useContext(productCategoryFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllProductCategoryProductForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<ProductCategoryProductFormState>()
  
  function setProductCategoryProductId(id: number){
    if(!activeForm) return
    
    if(!formState.productCategoryProductForms.find(f=>f.key==activeForm.key))
      addProductCategoryProductForm(products.find(i=>i.id==id))
    else
      setProductCategoryProductFormState({...activeForm, id:id})
  }
  const {modalSelect, showSelect} = useProductSelect(
    products.filter(i=>formState.productCategoryProductForms.find(f=>f.id==i.id)==undefined), 
    setProductCategoryProductId, 
    activeForm?.id??0,
    [ProductField.Category]
  )
   
  function openSelect(form:ProductCategoryProductFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <div>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.productCategoryProductForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <ProductCategoryProductForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructProductCategoryProductForm())}
        deleteAllFn={deleteAll}
      />
    </div>
      <div className='links-disabled'>
      {modalSelect}
      </div>
    </>
  )
}

export default ProductCategoryProductFormList;