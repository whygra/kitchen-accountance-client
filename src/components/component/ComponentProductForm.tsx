import {Form} from 'react-bootstrap'
import SelectCreateGroup from '../product/SelectCreateGroup'
import { ComponentProductFormState } from '../../redux/reducers/componentFormReducer'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import 'bootstrap'
import { setContentPercentageByFormKey, setIsCreateNewByFormKey, setNewProductNameByFormKey, setProductIdByFormKey, setWastePercentageByFormKey } from '../../redux/actions/comoponentFormActions'

interface ComponentProductFormProps {
  state: ComponentProductFormState,
}

function ComponentProductForm({state}: ComponentProductFormProps) {

  const dispatch : Dispatch<any> = useDispatch();

  function setProductId(productId:number) {
    dispatch(setProductIdByFormKey(state.key, productId))
  }

  function setNewProductName(name:string) {
    dispatch(setNewProductNameByFormKey(state.key, name))
  }

  function setIsCreate(isCreate:boolean) {
    dispatch(setIsCreateNewByFormKey(state.key, isCreate))
  }

  function setContentPercentage(contentPercentage:number) {
    dispatch(setContentPercentageByFormKey(state.key, contentPercentage))
  }

  function setWastePercentage(wastePercentage:number) {
    dispatch(setWastePercentageByFormKey(state.key, wastePercentage))
  }

  return (
    <>
      <SelectCreateGroup 
        productId = {state.productId}
        newProductName = {state.newProductName}
        isCreateProduct = {state.isCreateProduct}
        onIsCreateChange = {setIsCreate}
        onNameChange = {setNewProductName}
        onProductChange = {setProductId}
      />
      <Form.Group className="mb-3">
        <Form.Label>Доля в общем весе</Form.Label>
        <Form.Control
          type="number"
          min={0.5}
          max={100}
          step={0.5}
          defaultValue={state.contentPercentage}
          onChange={e=>setContentPercentage(parseFloat(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Процент отхода</Form.Label>
        <Form.Control
          type="number"
          min={0}
          max={100}
          step={0.5}
          defaultValue={state.wastePercentage}
          onChange={e=>setWastePercentage(parseFloat(e.target.value))}
        />
      </Form.Group>
    </>
  )
}

export default ComponentProductForm;