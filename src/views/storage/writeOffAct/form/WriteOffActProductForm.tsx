import {Button, Card, Col, Container, Form, FormControl, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../../models'
import { WriteOffActProductFormState } from '../../../../models/storage/WriteOffActFormState'
import 'bootstrap'
import { useContext, useState } from 'react'
import TooltipButton from '../../../shared/TooltipButton'
import IsCreateSwitch from '../../../shared/selectCreateGroup/IsCreateSwitch'
import { inventoryActContext } from '../../../../context/forms/storage/InventoryActFormContext'
import { InventoryActProductFormState } from '../../../../models/storage/InventoryActFormState'
import { writeOffActContext } from '../../../../context/forms/storage/WriteOffActFormContext'

interface WriteOffActProductFormProps {
  formState: InventoryActProductFormState,
  openSelect: (form:InventoryActProductFormState)=>void,
}

function WriteOffActProductForm({formState, openSelect}: WriteOffActProductFormProps) {

  const {
    setProductFormState, 
    removeProductForm, 
    products
  } = useContext(writeOffActContext)
  
  function setProductName(name:string) {
    setProductFormState({...formState, name: name})
  }

  function setProductAction(action:DataAction) {
    setProductFormState({...formState, dataAction: action})
  }

  function setNetWeight(value:number) {
    setProductFormState({...formState, net_weight: value})
  }

  function setAmount(value:number) {
    setProductFormState({...formState, amount: value})
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
                <Form.Label>Масса нетто 1 ед. (г/шт)</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0.01}
                  step={0.01}
                  value={formState.net_weight}
                  onChange={e=>setNetWeight(parseFloat(e.target.value))}
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
                <Form.Label>Количество</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={formState.amount}
                  step={0.01}
                  value={formState.amount}
                  onChange={e=>setAmount(parseFloat(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( .. &lt; 0 )
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            </Col>
          </Row>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
            <TooltipButton
              tooltip='удалить'
              variant='danger'
              onClick={()=>removeProductForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
        </Col>
      </Row>
    </Card>
  )
}

export default WriteOffActProductForm;