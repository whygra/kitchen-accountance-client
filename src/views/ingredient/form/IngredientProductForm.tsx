import {Button, Card, Col, Container, Form, FormControl, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup'
import { DataAction } from '../../../models'
import { IngredientProductFormState } from '../../../models/ingredient/IngredientFormState'
import 'bootstrap'
import { useContext, useState } from 'react'
import { ingredientContext } from '../../../context/forms/nomenclature/ingredient/IngredientFormContext'
import TooltipButton from '../../shared/TooltipButton'
import IsCreateSwitch from '../../shared/selectCreateGroup/IsCreateSwitch'

interface IngredientsProductFormProps {
  formState: IngredientProductFormState,
  openSelect: (form:IngredientProductFormState)=>void,
}

function IngredientProductForm({formState, openSelect}: IngredientsProductFormProps) {

  const {
    setIngredientProductFormState, 
    removeIngredientProductForm, 
    products
  } = useContext(ingredientContext)

  
  function handleNetWeightChange(value: number) {
    setIngredientProductFormState({...formState, netWeight: value, wastePercentage: 100 - value/formState.grossWeight*100})
  }
  
  function setProductName(name:string) {
    setIngredientProductFormState({...formState, name: name})
  }

  function setProductAction(action:DataAction) {
    setIngredientProductFormState({...formState, dataAction: action})
  }

  function setGrossWeight(value:number) {
    setIngredientProductFormState({...formState, grossWeight: value, wastePercentage:100 - formState.netWeight/value*100})
  }

  function setWastePercentage(wastePercentage:number) {
    setIngredientProductFormState({...formState, wastePercentage: wastePercentage})
  }

  const selectedProduct = products.find(p=>p.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

          <Col className='mb-2' md={12} lg={4}>
              <div className="mb-2 d-flex flex-row justify-content-between">
              <b>Продукт</b>
                <IsCreateSwitch
                  dataAction={formState.dataAction}
                  setDataAction={setProductAction}
                />
              </div>
            {formState.dataAction == DataAction.Create 
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
                  value={selectedProduct ? selectedProduct.name : ''} 
                />
                <Form.Control.Feedback type="invalid">
                  выберите элемент
                </Form.Control.Feedback>
                </Form.Group>
            }
          </Col>
            <Col md={6} lg={4} >
            <div className='d-flex'>
              <Form.Group className='flex-grow-1 mb-2'>
                <Form.Label>Масса брутто</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0.01}
                  step={0.01}
                  value={formState.grossWeight}
                  onChange={e=>setGrossWeight(parseFloat(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( .. ≥ 0.01 )
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            </Col>
            <Col md={6} lg={4} >
            <div className='d-flex'>
              <Form.Group className='flex-grow-1 mb-2'>
                <Form.Label>Масса нетто</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={formState.grossWeight}
                  step={0.01}
                  value={formState.netWeight}
                  onChange={e=>handleNetWeightChange(parseFloat(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( {formState.grossWeight.toFixed(2)} ≥ .. ≥ 0 )
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            </Col>
            <Col md={6} lg={4} >
            <Form.Group className='mb-2' as={Col} md={6} lg={4}>
            <Form.Label>Отход</Form.Label>
            
            <span className='px-2 pt-2 text-end text-primary text-nowrap'>{formState.wastePercentage.toFixed(2)}%</span>
            </Form.Group>
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