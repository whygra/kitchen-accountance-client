import {Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { 
  addComponentProductForm,
  markOnDeleteComponentProductForm,
} from '../../redux/actions/comoponentFormActions'
import ComponentProductForm from './ComponentProductForm'
import { AppState } from '../../redux/store'
import { v4 as uuid } from "uuid";

function ComponentProductFormList() {
  const forms = useSelector((state: AppState) => state.componentFormState.componentProductForms);

  const dispatch: Dispatch<any> = useDispatch();

  function addForm() {
    dispatch(addComponentProductForm(
      {
        id: 0,
        isCreateProduct: false,
        isMarkedForDelete: false,
        contentPercentage: 0,
        wastePercentage: 0,
        key: uuid(),
        newProductName: "", 
        productId: 1, 
      })
    )
  }

  function removeForm(key:string) {
    dispatch(
      markOnDeleteComponentProductForm(key, true)
    )
  }

  return (
    <>
      <h3>Продукты</h3>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <ComponentProductForm state={formState}/>
            <Button variant="danger" onClick={()=>removeForm(formState.key)} value="D"/>
          </div>)
      }
      <Button onClick={addForm}>Добавить</Button>
    </>
  )
}

export default ComponentProductFormList;