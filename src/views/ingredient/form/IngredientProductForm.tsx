import {Button, Card, Col, Container, Form, FormControl, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup'
import { DataAction } from '../../../models'
import { IngredientProductFormState } from '../../../models/ingredient/IngredientFormState'
import 'bootstrap'
import { useContext, useEffect } from 'react'
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext'
import TooltipButton from '../../shared/TooltipButton'
import IsCreateSwitch from '../../shared/selectCreateGroup/IsCreateSwitch'

interface IngredientsProductFormProps {
  formState: IngredientProductFormState,
  openSelect: (form:IngredientProductFormState)=>void,
}

function IngredientProductForm({formState, openSelect}: IngredientsProductFormProps) {

  const {
    getWeightToPercentageCoefficient, 
    setIngredientProductFormState, 
    removeIngredientProductForm, 
    products
  } = useContext(ingredientContext)

  function getWeightPercentage() {
    const coef = getWeightToPercentageCoefficient()
    const percentage = formState.weight*coef
    return percentage
  }

  function setProductName(name:string) {
    setIngredientProductFormState({...formState, name: name})
  }

  function setProductAction(action:DataAction) {
    setIngredientProductFormState({...formState, productDataAction: action})
  }

  function setWeight(contentPercentage:number) {
    setIngredientProductFormState({...formState, weight: contentPercentage, weightPercentage: getWeightPercentage()})
  }

  function setWastePercentage(wastePercentage:number) {
    setIngredientProductFormState({...formState, wastePercentage: wastePercentage})
  }

  const selectedProduct = products.find(p=>p.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.productDataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

          <Col sm={6}>
              <div className="mb-2 d-flex flex-row justify-content-between">
              <b>Продукт</b>
                <IsCreateSwitch
                  dataAction={formState.productDataAction}
                  setDataAction={setProductAction}
                />
              </div>
            {formState.productDataAction == DataAction.Create 
              ? <Form.Group>
                <Form.Control
                  required
                  value={formState.name}
                  onChange={(e)=>setProductName(e.target.value)}
                  />  
                <Form.Control.Feedback type="invalid">
                  введите название
                </Form.Control.Feedback>
                </Form.Group>
              : <Form.Group>
                <FormControl
                  style={{caretColor:'transparent'}}
                  type='text'
                  role="button"
                  placeholder='--не выбран--'
                  onClick={()=>openSelect(formState)} 
                  required 
                  value={selectedProduct ? `${selectedProduct.id}. ${selectedProduct.name}` : ''} 
                  />
                <Form.Control.Feedback type="invalid">
                  выберите элемент
                </Form.Control.Feedback>
                </Form.Group>
            }
              </Col>
            <Col md={3}>
            <div className='d-flex'>
              <Form.Group className='flex-grow-1'>
                <Form.Label>Вес (грамм)</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0.01}
                  step={0.01}
                  value={formState.weight}
                  onChange={e=>setWeight(parseFloat(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( .. ≥ 0.01 )
                </Form.Control.Feedback>
              </Form.Group>
              <div className='d-flex flex-column ms-3' style={{width: '3.8em'}}>
                <i>Доля</i>
                <i className='text-end mt-3'>{formState.weightPercentage.toFixed(2)}%</i>
              </div>
            </div>
            </Col>
            <Form.Group as={Col} md={3}>
            <Form.Label>Потери в весе (%)</Form.Label>
            <Form.Control
                type="number"
                required
                min={0}
                max={100}
                step={0.01}
                defaultValue={formState.wastePercentage}
                onChange={e=>setWastePercentage(parseFloat(e.target.value))}
                />
            <Form.Control.Feedback type="invalid">
              введите допустимое значение (от 0 до 100)
            </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>

            <TooltipButton
              tooltip='удалить'
              variant='danger'
              onClick={()=>removeIngredientProductForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default IngredientProductForm;