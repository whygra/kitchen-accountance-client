import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import DishIngredientForm from './DishIngredientForm'
import { v4 as uuid } from "uuid";
import { DishIngredientFormState } from '../../../models/DishFormState'
import { useContext } from 'react'
import { dishFormContext } from '../../../context'

function DishIngredientFormList() {

  const { 
    addDishIngredientForm, 
    formState
  } = useContext(dishFormContext);

  const forms = formState.dishIngredientForms

  return (
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <DishIngredientForm formState={formState}/>
          </div>)
      }

      <div className="d-flex flex-row-reverse">

        <OverlayTrigger
          overlay={
            <Tooltip>
              Добавить ингредиент
            </Tooltip>
          }
        >
          <Button className="ms-2" variant="success" onClick={addDishIngredientForm}>+</Button>
        </OverlayTrigger>

      </div>
    </Container>
  )
}

export default DishIngredientFormList;