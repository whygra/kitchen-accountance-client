import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishIngredientFormState } from '../../../models/DishFormState'
import 'bootstrap'
import { useContext } from 'react'
import { dishFormContext } from '../../../context'
import SelectCreateGroup from '../../ingredient/inputs/SelectCreateGroup'
import { setIngredientTypeId } from '../../../redux/actions/ingredientFormActions'

interface DishesIngredientFormProps {
  formState: DishIngredientFormState,
}

function DishIngredientForm({formState}: DishesIngredientFormProps) {

  const {setDishIngredientFormState, removeDishIngredientForm, ingredientTypes, ingredients} = useContext(dishFormContext)

  function setIngredientId(ingredientId:number) {
    setDishIngredientFormState({...formState, ingredientId: ingredientId})
  }

  function setNewIngredientName(name:string) {
    setDishIngredientFormState({...formState, ingredientName: name})
  }

  function setIngredientAction(action:DataAction) {
    setDishIngredientFormState({...formState, ingredientDataAction: action})
  }

  function setTypeId(id:number) {
    setDishIngredientFormState({...formState, ingredientTypeId: id})
  }

  function setContentPercentage(contentPercentage:number) {
    setDishIngredientFormState({...formState, ingredientRawWeight: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setDishIngredientFormState({...formState, wastePercentage: wastePercentage})
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
              ingredientId = {formState.ingredientId}
              newIngredientName = {formState.ingredientName}
              newIngredientTypeId={formState.ingredientTypeId}
              dataAction = {formState.ingredientDataAction}
              ingredientTypes={ingredientTypes}
              ingredients={ingredients}
              setDataAction = {setIngredientAction}
              setName = {setNewIngredientName}
              setTypeId={setTypeId}
              setIngredientId = {setIngredientId}
              />
            </Col>
            <Col md={2}>
            <Form.Label>Вес</Form.Label>
            <Form.Control
                type="number"
                min={0.5}
                step={0.1}
                value={formState.ingredientRawWeight}
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
            ? <Button variant="warning" onClick={()=>setIngredientAction(DataAction.None)}>C</Button>
            : <Button variant="danger" onClick={()=>removeDishIngredientForm(formState.key)}>D</Button>
          }
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishIngredientForm;