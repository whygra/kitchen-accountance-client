import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import DishComponentForm from './DishComponentForm'
import { v4 as uuid } from "uuid";
import { DishComponentFormState } from '../../../models/DishFormState'
import { useContext } from 'react'
import { context } from '../../../controllers/DishFormController'

function DishComponentFormList() {

  const { 
    addDishComponentForm, 
    formState
  } = useContext(context);

  const forms = formState.dishComponentForms

  return (
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <DishComponentForm formState={formState}/>
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
          <Button className="ms-2" variant="success" onClick={addDishComponentForm}>+</Button>
        </OverlayTrigger>

      </div>
    </Container>
  )
}

export default DishComponentFormList;