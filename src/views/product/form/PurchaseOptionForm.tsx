import { ReactElement, useContext, useState } from "react"
import { PurchaseOptionFormState } from "../../../models/ProductFormState"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { productFormContext } from "../../../context/ProductFormContext"
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
                <Row>

                <Button
                  className="text-start"
                  variant='none'
                  onClick={()=>openSelect(formState)}
                  >{selectedPO ? `${selectedPO.id}. ${purchaseOptions.find(item => item.id==formState.id)?.name}` : 'не выбран'}
                </Button>
                </Row>
                
              </Col>
  
              <Col sm={6} className='mb-2'>
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
              onClick={()=>removePurchaseOptionForm(formState.key)}
            ><i className='bi bi-x-lg'/></TooltipButton>
          </Col>
        </Row>
      </Card>
      </>
    )
  }
  
  export default PurchaseOptionForm;