import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructProductTagProductForm, ProductTagProductFormState } from '../../../models/product/ProductTagFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import { productTagFormContext } from '../../../context/forms/nomenclature/product/ProductTagFormContext';
import ProductTagProductForm from './ProductTagProductForm';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

function ProductTagProductFormList() {

  const { 
    addProductTagProductForm, 
    removeAllProductTagProductForms,
    setProductTagProductFormState,
    removeProductTagProductForm,
    formState,
    products,
  } = useContext(productTagFormContext);


  function deleteAll(){
    removeAllProductTagProductForms()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<ProductTagProductFormState>()
  
  function setProductTagProductId(id: number){
    if(!activeForm) return
    
    if(!formState.productTagProductForms.find(f=>f.key==activeForm.key))
      addProductTagProductForm(products.find(i=>i.id==id))
    else
      setProductTagProductFormState({...activeForm, id:id})
  }
  const {modalSelect, showSelect} = useProductSelect(
    products.filter(i=>formState.productTagProductForms.find(f=>f.id==i.id)==undefined), 
    setProductTagProductId, 
    (activeForm?.id??0),
    [ProductField.Tag]
  )
   
  function openSelect(form:ProductTagProductFormState){
    setActiveForm(form)
    showSelect()
  }

  useFormHotkeys(
    ()=>openSelect(constructProductTagProductForm()),
    ()=>removeProductTagProductForm(
      formState.productTagProductForms[formState.productTagProductForms.length-1].key
    )
  )

  return (
    <>
    <div>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        formState.productTagProductForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <ProductTagProductForm formState={fs}/>
            </div>
          )
      }
      <FormListButtons
        addFn={()=>openSelect(constructProductTagProductForm())}
        deleteAllFn={deleteAll}
      />
    </div>
    {modalSelect}
    </>
  )
}

export default ProductTagProductFormList;