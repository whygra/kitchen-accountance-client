import { useContext, useEffect } from "react"
import { distributorFormContext } from "../../../context/DistributorFormContext"
import { PurchaseOptionFormState } from "../../../models/DistributorFormState"
import { DataAction } from "../../../models"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import ProductSelectCreateGroup from "../../shared/selectCreateGroup/SelectCreateGroup"
import UnitSelectCreateGroup from "../../unit/form/SelectCreateGroup"
import { Link } from "react-router-dom"
import TooltipButton from "../../shared/TooltipButton"

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
  
            <Col lg={4} md={12} className='mb-2'>
                <Form.Label>Код</Form.Label>
                <Form.Control
                    type="number"
                    value={formState.code}
                    onChange={e=>setCode(parseInt(e.target.value))}
                    />
              </Col>
              <Col lg={4} md={12} className='mb-2'>
                <Form.Label>Наименование</Form.Label>
                <Form.Control
                    type="text"
                    value={formState.name}
                    onChange={e=>setName(e.target.value)}
                    />
              </Col>
              <Col lg={4} md={6} sm={6} className='mb-2'>
              <Form.Label>Масса нетто</Form.Label>
              <Form.Control
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  defaultValue={formState.netWeight}
                  onChange={e=>setNetWeight(parseFloat(e.target.value))}
                  />
              </Col>
              <Col lg={4} md={6} sm={6} className='mb-2'>
              <Form.Label>Цена</Form.Label>
              <Form.Control
                  type="number"
                  min={0}
                  defaultValue={formState.price}
                  onChange={e=>setPrice(parseFloat(e.target.value))}
                  />
              </Col>

              <Col sm={6} lg={4}>
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
                  value={formState.productName}
                  onChange={(e)=>setNewProductName(e.target.value)}
                />
              </Row>
              : formState.productIsEditable 
              ? 
              <Button variant='none' onClick={()=>openSelect(formState)}>
                {selectedProduct ? `${selectedProduct.id}. ${selectedProduct.name}` : 'не выбран'}
              </Button>
              :
              <>
                <Form.Label>Продукты</Form.Label>
                <Link to={`/purchase-options/edit/${formState.id}`}>редактировать</Link>
              </>
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