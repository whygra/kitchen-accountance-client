import { useContext } from "react"
import { DataAction } from "../../../models"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { purchaseOptionFormContext } from "../../../context/PurchaseOptionFormContext"
import { ProductFormState } from "../../../models/PurchaseOptionFormState"
import SelectCreateGroup from "../../shared/selectCreateGroup/SelectCreateGroup"
import TooltipButton from "../../shared/TooltipButton"
import IsCreateSwitch from "../../shared/selectCreateGroup/IsCreateSwitch"

interface ProductFormProps {
    formState: ProductFormState
    openSelect: (o: ProductFormState)=>void
}

function ProductForm({formState, openSelect}: ProductFormProps) {

    const {setProductFormState, removeProductForm, products} = useContext(purchaseOptionFormContext)
  
    function setAction(action:DataAction) {
      setProductFormState({...formState, dataAction: action})
    }
  
    function setProductName(name:string) {
      setProductFormState({...formState, name:name})
    }
  
    function setProductShare(productShare:number) {
      setProductFormState({...formState, productShare: productShare})
    }
  
    const selectedProduct = products.find(p=>p.id==formState.id)

    
    return ( 
      <Card className='w-100 p-3'>
        <Row>
          <Col md={11}
          style={formState.dataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
          >
            <Row>
              <Col sm={6} className='mb-2'>
                <div className="d-flex flex-row justify-content-between">
                <Form.Label>Продукт</Form.Label>
                  <IsCreateSwitch
                    dataAction={formState.dataAction}
                    setDataAction={setAction}
                  />
                </div>
                {formState.dataAction == DataAction.Create 
                  ? 
                  <Form.Group>
                    <Form.Control
                      required
                      value={formState.name}
                      onChange={(e)=>setProductName(e.target.value)}
                    />            
                  <Form.Control.Feedback type="invalid">
                    введите название
                  </Form.Control.Feedback>
                    
                  </Form.Group>
                  :
                  <Form.Group>
                  <Form.Control 
                    style={{caretColor:'transparent'}}
                    type='text'
                    role="button"
                    placeholder='--не выбран--'
                    onClick={()=>openSelect(formState)} 
                    required
                    value={selectedProduct ? `${selectedProduct.id}. ${selectedProduct.name}` : ''} 
                  />
                  <Form.Control.Feedback type="invalid">
                    выберите продукт
                  </Form.Control.Feedback>
                  </Form.Group>
                }
              </Col>
  
              <Col as={Form.Group} lg={6} md={6} sm={6} className='mb-2'>
                <Form.Label>Доля разборки</Form.Label>
                <Form.Control
                  type='number'
                  required
                  min={1}
                  max={100}
                  step={0.1}
                  value={formState.productShare}
                  onChange={e=>setProductShare(parseInt(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  введите значение (от 1 до 100)
                </Form.Control.Feedback>
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
  
  export default ProductForm;