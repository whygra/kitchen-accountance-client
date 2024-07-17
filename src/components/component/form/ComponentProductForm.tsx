import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../product/inputs/SelectCreateGroup'
import { SubmitActionType } from '../../../models'
import { ComponentProductFormState } from '../../../models/component'
import 'bootstrap'

interface ComponentsProductFormProps {
  formState: ComponentProductFormState,
  setComponentProductFormState: (state:ComponentProductFormState)=>void,
  removeComponentProductForm: (key: string)=>void,
}

function ComponentProductForm({formState, removeComponentProductForm, setComponentProductFormState}: ComponentsProductFormProps) {

  function setProductId(productId:number) {
    setComponentProductFormState({...formState, productId: productId})
  }

  function setNewProductName(name:string) {
    setComponentProductFormState({...formState, productName: name})
  }

  function setProductAction(action:SubmitActionType) {
    setComponentProductFormState({...formState, dataAction: action})
  }

  function setContentPercentage(contentPercentage:number) {
    setComponentProductFormState({...formState, rawContentPercentage: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setComponentProductFormState({...formState, wastePercentage: wastePercentage})
  }

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==SubmitActionType.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

            <Col md={4}>
            <Form.Label>
              Продукт
            </Form.Label>
            <SelectCreateGroup 
              productId = {formState.productId}
              newProductName = {formState.productName}
              submitAction = {formState.productDataAction}
              onSubmitActionChange = {setProductAction}
              onNameChange = {setNewProductName}
              onProductChange = {setProductId}
              /></Col>
            <Col md={4}>
            <Form.Label>Доля в общем весе</Form.Label>
            <Form.Control
                type="number"
                min={0.5}
                max={100}
                step={0.5}
                value={formState.rawContentPercentage}
                onChange={e=>setContentPercentage(parseFloat(e.target.value))}
                />
            </Col>
            <Col md={3}>
            <Form.Label>Процент отхода</Form.Label>
            <Form.Control
                type="number"
                min={0}
                max={100}
                step={0.5}
                defaultValue={formState.wastePercentage}
                onChange={e=>setWastePercentage(parseFloat(e.target.value))}
                />
            </Col>
          </Row>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
          {formState.dataAction==SubmitActionType.Delete 
            ? <Button variant="warning" onClick={()=>setProductAction(SubmitActionType.None)}>C</Button>
            : <Button variant="danger" onClick={()=>removeComponentProductForm(formState.key)}>D</Button>
          }
          
        </Col>
      </Row>
    </Card>
  )
}

export default ComponentProductForm;