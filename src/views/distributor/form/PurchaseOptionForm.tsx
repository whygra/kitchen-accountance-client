import { useContext, useEffect } from "react"
import { distributorFormContext } from "../../../context/forms/distributor/DistributorFormContext"
import { PurchaseOptionFormState } from "../../../models/DistributorFormState"
import { DataAction } from "../../../models"
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap"
import ProductSelectCreateGroup from "../../shared/selectCreateGroup/SelectCreateGroup"
import UnitSelectCreateGroup from "../../unit/form/SelectCreateGroup"
import { Link } from "react-router-dom"
import TooltipButton from "../../shared/TooltipButton"
import IsCreateSwitch from "../../shared/selectCreateGroup/IsCreateSwitch"

interface PurchaseOptionFormProps {
    formState: PurchaseOptionFormState
    openSelect: (o: PurchaseOptionFormState)=>void
}

function PurchaseOptionForm({formState, openSelect}: PurchaseOptionFormProps) {

    const {setPurchaseOptionFormState, removePurchaseOptionForm, units, products} = useContext(distributorFormContext)
  
  
    function setNewProductName(name:string) {
      setPurchaseOptionFormState({...formState, productName: name})
    }
  
    function setProductAction(action:DataAction) {
      setPurchaseOptionFormState({...formState, productDataAction: action})
    }
  
    function setUnitId(id:number) {
      setPurchaseOptionFormState({...formState, unitId: id})
    }
  
    function setUnitAction(action:DataAction) {
      setPurchaseOptionFormState({...formState, unitDataAction: action})
    }
  
    function setNewUnitLongName(name:string) {
      setPurchaseOptionFormState({...formState, unitLongName: name})
    }
  
    function setNewUnitShortName(name:string) {
      setPurchaseOptionFormState({...formState, unitShortName: name})
    }
  
    function setNetWeight(netWeight:number) {
      setPurchaseOptionFormState({...formState, netWeight: netWeight})
    }
  
    function setPrice(price:number) {
      setPurchaseOptionFormState({...formState, price: price})
    }
  
    function setName(name:string) {
      setPurchaseOptionFormState({...formState, name: name})
    }
  
    function setCode(code:number) {
      setPurchaseOptionFormState({...formState, code: code})
    }
  
    const selectedProduct = products.find(i=>i.id==formState.productId)
    
    return ( 
      <Card className='w-100 p-3'>
        <Row>
          <Col md={11}>
            <Row>
  
            <Form.Group as={Col} lg={4} md={12} className='mb-2'>
              <Form.Label>Код</Form.Label>
              <Form.Control
                type="number"
                value={formState.code}
                onChange={e=>setCode(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group as={Col} lg={4} md={12} className='mb-2'>
              <Form.Label>Наименование</Form.Label>
              <Form.Control
                required
                type="text"
                value={formState.name}
                onChange={e=>setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                введите наименование
              </Form.Control.Feedback>
              
            </Form.Group>
            <Form.Group as={Col} lg={4} md={6} sm={6} className='mb-2'>
              <Form.Label>Масса нетто (грамм)</Form.Label>
              <Form.Control
                required
                type="number"
                min={1}
                step={1}
                defaultValue={formState.netWeight}
                onChange={e=>setNetWeight(parseFloat(e.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                введите допустимое значение ( .. ≥ 1 )
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg={4} md={6} sm={6} className='mb-2'>
            <Form.Label>Цена</Form.Label>
            <Form.Control
              required
              type="number"
              min={0}
              step={0.01}
              defaultValue={formState.price}
              onChange={e=>setPrice(parseFloat(e.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              введите допустимое значение ( .. ≥ 0  )
            </Form.Control.Feedback>
            </Form.Group>

            <Col sm={6} lg={4}>
            <div className="d-flex flex-row justify-content-between">
            <b>{formState.productIsEditable ? "Продукт" : 'Продукты'}</b>
              <IsCreateSwitch
                dataAction={formState.productDataAction}
                setDataAction={setProductAction}
              />
            </div>
            {formState.productDataAction == DataAction.Create 
              ?<Form.Group>
                <Form.Control
                  required
                  className="mt-2"
                  value={formState.productName}
                  onChange={(e)=>setNewProductName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  введите допустимое значение ( .. ≥ 1 )
                </Form.Control.Feedback>
              </Form.Group>
              : formState.productIsEditable 
              ? 
              <Form.Group>
              
              <FormControl
                className="mt-2"
                style={{caretColor:'transparent'}}
                type='text'
                role="button"
                placeholder='--не выбран--'
                onClick={()=>openSelect(formState)} 
                value={selectedProduct ? selectedProduct.name : ''}
                />
              </Form.Group>
              :
              <div
                className="mt-2"
              >
                <Link to={`/purchase-options/edit/${formState.id}`}>
                  <TooltipButton 
                    tooltip="редактировать..."
                    variant='warning'>
                    <>[{formState.productName},...] <i className="bi bi-pencil"/></>
                  </TooltipButton>
                </Link>
              </div>
            }
              </Col>

              <Col sm={6} lg={4} className='mb-2'>
              <UnitSelectCreateGroup
                unitId = {formState.unitId}
                newUnitShortName = {formState.unitShortName}
                newUnitLongName = {formState.unitLongName}
                dataAction = {formState.unitDataAction}
                units={units}
                setDataAction = {setUnitAction}
                setLong = {setNewUnitLongName}
                setShort = {setNewUnitShortName}
                setUnitId = {setUnitId}
                />
              </Col>
            </Row>
          </Col>
          <Col md={1} className='d-flex justify-content-end'>
            <TooltipButton
              tooltip='удалить'
              variant='danger'
              onClick={()=>removePurchaseOptionForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
          </Col>
        </Row>
      </Card>
    )
  }
  
  export default PurchaseOptionForm;