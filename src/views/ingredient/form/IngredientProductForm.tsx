import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup'
import { DataAction } from '../../../models'
import { IngredientProductFormState } from '../../../models/IngredientFormState'
import 'bootstrap'
import { useContext, useEffect } from 'react'
import { ingredientContext } from '../../../context/IngredientFormContext'
import TooltipButton from '../../shared/TooltipButton'

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
              <div className="d-flex flex-row justify-content-between">
              <b>Продукт</b>
              <Form.Switch 
                checked={formState.productDataAction==DataAction.Create} 
                onChange={(e)=>setProductAction(e.target.checked?DataAction.Create:DataAction.None)}
                label={<small><i>создать</i></small>}
                />
              </div>
            {formState.productDataAction == DataAction.Create 
              ? 
              <Row>
                <Form.Control
                  value={formState.name}
                  onChange={(e)=>setProductName(e.target.value)}
                />
              </Row>
              : 
              <Button variant='none' onClick={()=>openSelect(formState)}>
                {selectedProduct ? `${selectedProduct.id}. ${selectedProduct.name}` : 'не выбран'}
              </Button>
            }
              </Col>
            <Col md={3}>
            <div className='d-flex'>
              <div className='flex-grow-1'>
                <Form.Label>Вес</Form.Label>
                <Form.Control
                    type="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={formState.weight}
                    onChange={e=>setWeight(parseFloat(e.target.value))}
                    />
              </div>
              <div className='d-flex flex-column ms-3' style={{width: '3.8em'}}>
                <i>Доля</i>
                <i className='text-end mt-3'>{formState.weightPercentage.toFixed(2)}%</i>
              </div>
            </div>
            </Col>
            <Col md={3}>
            <Form.Label>Потери в весе (%)</Form.Label>
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