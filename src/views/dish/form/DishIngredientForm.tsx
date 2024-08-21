import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishIngredientFormState } from '../../../models/DishFormState'
import 'bootstrap'
import { useContext } from 'react'
import SelectCreateGroup from '../../ingredient/inputs/SelectCreateGroup'
import { setIngredientTypeId } from '../../../redux/actions/ingredientFormActions'
import { dishFormContext } from '../../../context/DishFormContext'

interface DishesIngredientFormProps {
  formState: DishIngredientFormState,
}

function DishIngredientForm({formState}: DishesIngredientFormProps) {

  const {setDishIngredientFormState, removeDishIngredientForm, ingredientTypes, ingredients} = useContext(dishFormContext)

  function setIngredientId(ingredientId:number) {
    setDishIngredientFormState({...formState, id: ingredientId})
  }

  function setNewIngredientName(name:string) {
    setDishIngredientFormState({...formState, name: name})
  }

  function setIngredientAction(action:DataAction) {
    setDishIngredientFormState({...formState, ingredientDataAction: action})
  }

  function setTypeId(id:number) {
    setDishIngredientFormState({...formState, typeId: id})
  }

  function setContentPercentage(contentPercentage:number) {
    setDishIngredientFormState({...formState, ingredientAmount: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setDishIngredientFormState({...formState, wastePercentage: wastePercentage})
  }

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.ingredientDataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

            <Col md={6}>
            <SelectCreateGroup
              ingredientId = {formState.id}
              newIngredientName = {formState.name}
              newIngredientTypeId={formState.typeId}
              dataAction = {formState.ingredientDataAction}
              ingredientTypes={ingredientTypes}
              ingredients={ingredients}
              setDataAction = {setIngredientAction}
              setName = {setNewIngredientName}
              setTypeId={setTypeId}
              setIngredientId = {setIngredientId}
              />
            </Col>
            <Col md={3}>
            <Form.Label>Вес/Количество</Form.Label>
            <Form.Control
                type="number"
                min={0.5}
                step={0.1}
                value={formState.ingredientAmount}
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
          {formState.ingredientDataAction==DataAction.Delete 
            ? <Button variant="warning" onClick={()=>setIngredientAction(DataAction.None)}>C</Button>
            : <Button variant="danger" onClick={()=>removeDishIngredientForm(formState.key)}>D</Button>
          }
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishIngredientForm;