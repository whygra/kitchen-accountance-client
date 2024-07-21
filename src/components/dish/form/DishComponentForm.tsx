import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishComponentFormState } from '../../../models/DishFormState'
import 'bootstrap'
import { useContext } from 'react'
import { context } from '../../../controllers/DishFormController'
import SelectCreateGroup from '../../component/inputs/SelectCreateGroup'
import { setComponentTypeId } from '../../../redux/actions/comoponentFormActions'

interface DishesComponentFormProps {
  formState: DishComponentFormState,
}

function DishComponentForm({formState}: DishesComponentFormProps) {

  const {setDishComponentFormState, removeDishComponentForm, componentTypes, components} = useContext(context)

  function setComponentId(componentId:number) {
    setDishComponentFormState({...formState, componentId: componentId})
  }

  function setNewComponentName(name:string) {
    setDishComponentFormState({...formState, componentName: name})
  }

  function setComponentAction(action:DataAction) {
    setDishComponentFormState({...formState, componentDataAction: action})
  }

  function setTypeId(id:number) {
    setDishComponentFormState({...formState, componentTypeId: id})
  }

  function setContentPercentage(contentPercentage:number) {
    setDishComponentFormState({...formState, componentRawWeight: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setDishComponentFormState({...formState, wastePercentage: wastePercentage})
  }

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

            <Col md={7}>
            <Form.Label>
              Ингредиент
            </Form.Label>
            <SelectCreateGroup
              componentId = {formState.componentId}
              newComponentName = {formState.componentName}
              newComponentTypeId={formState.componentTypeId}
              dataAction = {formState.componentDataAction}
              componentTypes={componentTypes}
              components={components}
              setDataAction = {setComponentAction}
              setName = {setNewComponentName}
              setTypeId={setTypeId}
              setComponentId = {setComponentId}
              />
            </Col>
            <Col md={2}>
            <Form.Label>Вес</Form.Label>
            <Form.Control
                type="number"
                min={0.5}
                step={0.1}
                value={formState.componentRawWeight}
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
            ? <Button variant="warning" onClick={()=>setComponentAction(DataAction.None)}>C</Button>
            : <Button variant="danger" onClick={()=>removeDishComponentForm(formState.key)}>D</Button>
          }
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishComponentForm;