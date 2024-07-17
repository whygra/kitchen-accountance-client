import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { 
  addComponentProductForm,
  castContentsToValidPercentages,
  setComponentProductFormSubmitActionType,
} from '../../../redux/actions/comoponentFormActions'
import ComponentProductForm from './ComponentProductForm'
import { v4 as uuid } from "uuid";
import { ComponentProductFormState, SubmitActionType } from '../../../models'

interface ComponentProductFormListProps {
  addComponentProductForm: () => void
  setComponentProductFormState: (state:ComponentProductFormState)=>void
  removeComponentProductForm: (key:string) => void
  castToValidPercentages: () => void
  forms: ComponentProductFormState[]
}

function ComponentProductFormList({
  addComponentProductForm, 
  setComponentProductFormState, 
  removeComponentProductForm, 
  castToValidPercentages, 
  forms}: ComponentProductFormListProps) {

  return (
    <Container>
      
      <Form.Label><b>Продукты:</b></Form.Label>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <ComponentProductForm formState={formState} setComponentProductFormState={setComponentProductFormState} removeComponentProductForm={removeComponentProductForm}/>
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
          <Button className="ms-2" variant="success" onClick={addComponentProductForm}>+</Button>
        </OverlayTrigger>

      </div>
    </Container>
  )
}

export default ComponentProductFormList;