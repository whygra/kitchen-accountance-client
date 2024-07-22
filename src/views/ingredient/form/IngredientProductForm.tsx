import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../product/inputs/SelectCreateGroup'
import { DataAction } from '../../../models'
import { IngredientProductFormState } from '../../../models/IngredientFormState'
import 'bootstrap'
import { useContext } from 'react'
import { context } from '../../../controllers/IngredientFormController'

interface IngredientsProductFormProps {
  formState: IngredientProductFormState,
}

function IngredientProductForm({formState}: IngredientsProductFormProps) {

  const {setIngredientProductFormState, removeIngredientProductForm, products} = useContext(context)

  function setProductId(productId:number) {
    setIngredientProductFormState({...formState, productId: productId})
  }

  function setNewProductName(name:string) {
    setIngredientProductFormState({...formState, productName: name})
  }

  function setProductAction(action:DataAction) {
    setIngredientProductFormState({...formState, productDataAction: action})
  }

  function setContentPercentage(contentPercentage:number) {
    setIngredientProductFormState({...formState, rawContentPercentage: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setIngredientProductFormState({...formState, wastePercentage: wastePercentage})
  }

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
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
              products = {products}
              setDataAction = {setProductAction}
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
          {formState.dataAction==DataAction.Delete 
            ? <Button variant="warning" onClick={()=>setProductAction(DataAction.None)}>C</Button>
            : <Button variant="danger" onClick={()=>removeIngredientProductForm(formState.key)}>D</Button>
          }
          
        </Col>
      </Row>
    </Card>
  )
}

export default IngredientProductForm;