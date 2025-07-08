import {Button, Card, Col, Container, Form, FormControl, Row, Table} from 'react-bootstrap'
import SelectCreateGroup from '../../../shared/selectCreateGroup/SelectCreateGroup'
import { DataAction } from '../../../../models'
import { PurchaseActItemFormState } from '../../../../models/storage/PurchaseActFormState'
import 'bootstrap'
import { useContext, useState } from 'react'
import { purchaseActContext } from '../../../../context/forms/storage/PurchaseActFormContext'
import TooltipButton from '../../../shared/TooltipButton'
import IsCreateSwitch from '../../../shared/selectCreateGroup/IsCreateSwitch'
import UnitSelect from '../../../unit/form/UnitSelect'

interface PurchaseActItemFormProps {
  formState: PurchaseActItemFormState,
  openSelect: (form:PurchaseActItemFormState)=>void,
}

function PurchaseActItemForm({formState, openSelect}: PurchaseActItemFormProps) {
  const {
    formState: mainFormState,
    setItemFormState, 
    removeItemForm, 
    units,
  } = useContext(purchaseActContext)

  function setItemName(name:string) {
    setItemFormState({...formState, name: name})
  }

  function setItemAction(action:DataAction) {
    setItemFormState({...formState, dataAction: action})
  }

  function setNetWeight(value:number) {
    setItemFormState({...formState, net_weight: value})
  }

  function setAmount(value:number) {
    setItemFormState({...formState, amount: value})
  }

  function setPrice(value:number) {
    setItemFormState({...formState, price: value})
  }

  function setUnitId(value:number) {
    setItemFormState({...formState, unitId: value})
  }

  const selectedItem = mainFormState.distributor.purchase_options?.find(o=>o.id == formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

          <Col className='mb-2' md={6} lg={5}>
              <div className="mb-2 d-flex flex-row justify-content-between">
              <b>Позиция закупки</b>
                <IsCreateSwitch
                  dataAction={formState.dataAction}
                  setDataAction={setItemAction}
                />
              </div>
            {formState.dataAction == DataAction.Create 
              ? 
                <Form.Group>
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
            {formState.dataAction == DataAction.Create
              ?<Col md={4} lg={2}>
              
                <Form.Group>
                <Form.Label>Ед. изм.</Form.Label>
                <UnitSelect unitId={formState.unitId} units={units} setUnitId={setUnitId}/>
                </Form.Group>
              </Col>
              :<></>
            }
            <Col md={4} lg={3} >
            <div className='d-flex'>
              <Form.Group className='flex-grow-1 mb-2'>
                <Form.Label>Масса нетто (г/шт)</Form.Label>
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
            <Col md={4} lg={3} >
            <div className='d-flex'>
              <Form.Group className='flex-grow-1 mb-2'>
                <Form.Label>Количество</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
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
            <Col md={4} lg={3} >
            <div className='d-flex'>
              <Form.Group className='flex-grow-1 mb-2'>
                <Form.Label>Цена</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  step={0.01}
                  value={formState.price}
                  onChange={e=>setPrice(parseFloat(e.target.value))}
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

export default PurchaseActItemForm;