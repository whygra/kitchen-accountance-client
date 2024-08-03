import {Button, Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './PurchaseOptionForm'
import { useContext } from 'react'
import { distributorFormContext } from '../../../context'

function PurchaseOptionFormList() {

  const { 
    addPurchaseOptionForm, 
    formState
  } = useContext(distributorFormContext);

  const forms = formState.purchaseOptionForms

  return (
    <Container>
      
      <Form.Label><b>Позиции закупки:</b></Form.Label>
      {
        forms.map(formState => 
          <div key={`${formState.key}`}>
            <PurchaseOptionForm formState={formState}/>
          </div>)
      }

      <div className="d-flex flex-row-reverse">

        <OverlayTrigger
          overlay={
            <Tooltip>
              Добавить позицию
            </Tooltip>
          }
        >
          <Button className="ms-2" variant="success" onClick={addPurchaseOptionForm}>+</Button>
        </OverlayTrigger>

      </div>
    </Container>
  )
}

export default PurchaseOptionFormList;