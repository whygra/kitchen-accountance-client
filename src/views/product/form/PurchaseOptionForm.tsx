import { ReactElement, useContext, useState } from "react"
import { PurchaseOptionFormState } from "../../../models/product/ProductFormState"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { productFormContext } from "../../../context/product/ProductFormContext"
import TooltipButton from "../../shared/TooltipButton"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import PurchaseOptionsTableItem from "../../purchase_option/table/PurchaseOptionsTableItem"
import TableSelect from "../../shared/selectCreateGroup/TableSelect"

interface PurchaseOptionFormProps {
    formState: PurchaseOptionFormState
    openSelect: (o: PurchaseOptionFormState)=>void
}

function PurchaseOptionForm({formState, openSelect}: PurchaseOptionFormProps) {

    const {purchaseOptions, setPurchaseOptionFormState, removePurchaseOptionForm} = useContext(productFormContext)
  
    function setProductShare(productShare:number) {
      setPurchaseOptionFormState({...formState, productShare: productShare})
    }

    const selectedPO = purchaseOptions.find(item => item.id==formState.id)
    
    return ( 
      <>
      <Card className='w-100 p-3'>
        <Row>
          <Col md={11}>
            <Row>
              <Col sm={6} className='mb-2'>

                <Form.Label>Позиция закупки</Form.Label>

                <Form.Group>
                <Form.Control 
                  style={{caretColor:'transparent'}}
                  type='text'
                  role="button"
                  placeholder='--не выбран--'
                  onClick={()=>openSelect(formState)} 
                  required
                  value={selectedPO ? `${selectedPO.id}. ${selectedPO.name}` : ''} 
                />
        
                <Form.Control.Feedback type="invalid">
                  выберите позицию закупки
                </Form.Control.Feedback>
                </Form.Group>
                
              </Col>
  
              <Col as={Form.Group} sm={6} className='mb-2'>
                <Form.Label>Доля разборки</Form.Label>
                <Form.Control
                  required
                  type='number'
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
              onClick={()=>removePurchaseOptionForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
          </Col>
        </Row>
      </Card>
      </>
    )
  }
  
  export default PurchaseOptionForm;