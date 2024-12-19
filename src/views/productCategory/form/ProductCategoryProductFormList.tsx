import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructProductCategoryProductForm, ProductCategoryProductFormState } from '../../../models/product/ProductCategoryFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import { productCategoryFormContext } from '../../../context/product/ProductCategoryFormContext';
import ProductCategoryProductForm from './ProductCategoryProductForm';
import { ProductField } from '../../../hooks/sort/useSortProducts';

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
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.productCategoryProductForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <ProductCategoryProductForm formState={fs}/>
            </div>
          )
      }
      <div className="d-flex flex-row-reverse mt-2">

        <TooltipButton
          tooltip='добавить ингредиент'
          variant='success'
          onClick={()=>openSelect(constructProductCategoryProductForm())}
        ><i className='bi bi-plus-lg'/></TooltipButton>

        <BtnAskConfirmation
          tooltip='исключить все'
          variant="danger"
          onConfirm={deleteAll}
          prompt='исключить все ингредиенты? несохраненные данные будут утеряны'
        ><i className='bi bi-x-lg'/></BtnAskConfirmation>
      </div>
    </Container>
    {modalSelect}
    </>
  )
}

export default ProductCategoryProductFormList;