import { useContext } from "react"
import { DataAction } from "../../../models"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { purchaseOptionFormContext } from "../../../context/PurchaseOptionFormContext"
import { ProductFormState } from "../../../models/PurchaseOptionFormState"
import SelectCreateGroup from "../../shared/selectCreateGroup/SelectCreateGroup"
import TooltipButton from "../../shared/TooltipButton"

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
                <b>Продукт</b>
                <Form.Switch 
                  checked={formState.dataAction==DataAction.Create} 
                  onChange={(e)=>setAction(e.target.checked?DataAction.Create:DataAction.None)}
                  label={<small><i>создать</i></small>}
                  />
                </div>
                {formState.dataAction == DataAction.Create 
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
  
              <Col lg={6} md={6} sm={6} className='mb-2'>
                <Form.Label>Доля разборки</Form.Label>
                <Form.Control
                  value={formState.productShare}
                  onChange={e=>setProductShare(parseInt(e.target.value))}
                />
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