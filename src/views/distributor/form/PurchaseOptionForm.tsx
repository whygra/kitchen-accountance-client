import { useContext } from "react"
import { distributorFormContext } from "../../../context"
import { DistributorFormState, PurchaseOptionFormState } from "../../../models/DistributorFormState"
import { DataAction } from "../../../models"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import {SelectCreateGroup as ProductSelectCreateGroup} from "../../product/form/SelectCreateGroup"
import {SelectCreateGroup as UnitSelectCreateGroup} from "../../unit/form/SelectCreateGroup"

interface PurchaseOptionFormProps {
    formState: PurchaseOptionFormState
}

function PurchaseOptionForm({formState}: PurchaseOptionFormProps) {

    const {setPurchaseOptionFormState, removePurchaseOptionForm, units, products} = useContext(distributorFormContext)
  
    function setProductId(productId:number) {
      setPurchaseOptionFormState({...formState, productId: productId})
    }
  
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
  
    return ( 
      <Card className='w-100 p-3'>
        <Row>
          <Col md={11}
          style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
          >
            <Row>
  
              <Col md={3}>
              <Form.Label>
                Продукт
              </Form.Label>
              <ProductSelectCreateGroup
                productId = {formState.productId}
                newProductName = {formState.productName}
                dataAction = {formState.productDataAction}
                products={products}
                setDataAction = {setProductAction}
                setName = {setNewProductName}
                setProductId = {setProductId}
                />
              </Col>
  
              <Col md={3}>
              <Form.Label>
                Единица измерения
              </Form.Label>
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
              <Col md={2}>
              <Form.Label>Наименование</Form.Label>
              <Form.Control
                  type="text"
                  value={formState.name}
                  onChange={e=>setName(e.target.value)}
                  />
              </Col>
              <Col md={2}>
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
              <Col md={2}>
              <Form.Label>Цена</Form.Label>
              <Form.Control
                  type="number"
                  min={0}
                  defaultValue={formState.price}
                  onChange={e=>setPrice(parseFloat(e.target.value))}
                  />
              </Col>
            </Row>
          </Col>
          <Col md={1} className='d-flex justify-content-end'>
            {formState.dataAction==DataAction.Delete 
              ? <Button variant="warning" onClick={()=>setProductAction(DataAction.None)}>C</Button>
              : <Button variant="danger" onClick={()=>removePurchaseOptionForm(formState.key)}>D</Button>
            }
            
          </Col>
        </Row>
      </Card>
    )
  }
  
  export default PurchaseOptionForm;