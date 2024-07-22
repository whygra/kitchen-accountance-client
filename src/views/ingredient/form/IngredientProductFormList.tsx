import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { 
  addIngredientProductForm,
  castContentsToValidPercentages,
  setIngredientProductFormSubmitActionType,
} from '../../../redux/actions/ingredientFormActions'
import IngredientProductForm from './IngredientProductForm'
import { v4 as uuid } from "uuid";
import { IngredientProductFormState } from '../../../models/IngredientFormState'
import { useContext } from 'react'
import { context } from '../../../controllers/IngredientFormController'

function IngredientProductFormList() {

  const { 
    addIngredientProductForm, 
    castToValidPercentages,
    formState
  } = useContext(context);

  const forms = formState.ingredientProductForms

  return (
    <Container>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <IngredientProductForm formState={formState}/>
          </div>)
      }

      <div className="d-flex flex-row-reverse">
        <OverlayTrigger
          overlay={
            <Tooltip>
              Привести доли содержания к процентным значениям
            </Tooltip>
          }
        >
          <Button className="ms-2" variant="secondary" onClick={castToValidPercentages}>%</Button>
        </OverlayTrigger>

        <OverlayTrigger
          overlay={
            <Tooltip>
              Добавить продукт
            </Tooltip>
          }
        >
          <Button className="ms-2" variant="success" onClick={addIngredientProductForm}>+</Button>
        </OverlayTrigger>

      </div>
    </Container>
  )
}

export default IngredientProductFormList;