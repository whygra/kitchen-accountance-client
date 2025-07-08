import {Button, Card, Col, Container, Form, FormControl, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../../shared/selectCreateGroup/SelectCreateGroup'
import { DataAction } from '../../../../models'
import { SaleActItemFormState } from '../../../../models/storage/SaleActFormState'
import 'bootstrap'
import { useContext, useState } from 'react'
import { saleActContext } from '../../../../context/forms/storage/SaleActFormContext'
import TooltipButton from '../../../shared/TooltipButton'
import IsCreateSwitch from '../../../shared/selectCreateGroup/IsCreateSwitch'

interface SaleActItemFormProps {
  formState: SaleActItemFormState,
  openSelect: (form:SaleActItemFormState)=>void,
}

function SaleActItemForm({formState, openSelect}: SaleActItemFormProps) {

  const {
    setItemFormState, 
    removeItemForm, 
    dishes
  } = useContext(saleActContext)
  
  function setItemName(name:string) {
    setItemFormState({...formState, name: name})
  }

  function setItemAction(action:DataAction) {
    setItemFormState({...formState, dataAction: action})
  }

  function setPrice(value:number) {
    setItemFormState({...formState, price: value})
  }

  function setAmount(value:number) {
    setItemFormState({...formState, amount: value})
  }

  const selectedItem = dishes.find(p=>p.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

          <Col className='mb-2' md={12} lg={4}>
              <div className="mb-2 d-flex flex-row justify-content-between">
              <b>Блюдо</b>
                <IsCreateSwitch
                  dataAction={formState.dataAction}
                  setDataAction={setItemAction}
                />
              </div>
            {formState.dataAction == DataAction.Create 
              ? <Form.Group>
                <Form.Control
                  required
                  value={formState.name}
                  onChange={(e)=>setItemName(e.target.value)}
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
                  value={selectedItem ? selectedItem.name : ''} 
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
                <Form.Label>Цена 1 ед</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  step={0.01}
                  value={formState.price}
                  onChange={e=>setPrice(parseFloat(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( .. ≥ 0 )
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
              min={0.01}
              max={formState.amount}
              step={0.01}
              value={formState.amount}
              onChange={e=>setAmount(parseFloat(e.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              введите допустимое значение ( .. &mt; 0 )
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
              onClick={()=>removeItemForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
        </Col>
      </Row>
    </Card>
  )
}

export default SaleActItemForm;