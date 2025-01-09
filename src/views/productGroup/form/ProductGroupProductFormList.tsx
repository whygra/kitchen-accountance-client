import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructProductGroupProductForm, ProductGroupProductFormState } from '../../../models/product/ProductGroupFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import { productGroupFormContext } from '../../../context/product/ProductGroupFormContext';
import ProductGroupProductForm from './ProductGroupProductForm';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import FormListButtons from '../../shared/FormListButtons';

function ProductGroupProductFormList() {

  const { 
    addProductGroupProductForm, 
    removeAllProductGroupProductForms,
    setProductGroupProductFormState,
    formState,
    products,
  } = useContext(productGroupFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllProductGroupProductForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<ProductGroupProductFormState>()
  
  function setProductGroupProductId(id: number){
    if(!activeForm) return
    
    if(!formState.productGroupProductForms.find(f=>f.key==activeForm.key))
      addProductGroupProductForm(products.find(i=>i.id==id))
    else
      setProductGroupProductFormState({...activeForm, id:id})
  }
  const {modalSelect, showSelect} = useProductSelect(
    products.filter(i=>formState.productGroupProductForms.find(f=>f.id==i.id)==undefined), 
    setProductGroupProductId, 
    (activeForm?.id??0),
    [ProductField.Group]
  )
   
  function openSelect(form:ProductGroupProductFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <div>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.productGroupProductForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <ProductGroupProductForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructProductGroupProductForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    {modalSelect}
    </>
  )
}

export default ProductGroupProductFormList;