import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { ProductTagProductFormState } from '../../../models/product/ProductTagFormState'
import 'bootstrap'
import { useContext } from 'react'
import { productTagFormContext } from '../../../context/forms/nomenclature/product/ProductTagFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface ProductTagProductFormProps {
  formState: ProductTagProductFormState,
}

function ProductTagProductForm({formState}: ProductTagProductFormProps) {

  const {formState: tagFormState, removeProductTagProductForm, products} = useContext(productTagFormContext)

  const selected = products.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={5}>
          <div className="d-flex flex-column">
            <b>Продукт</b>
            <span>
              {selected?.name}
            </span>
          </div>
        </Col>
        <Col md={3}>
          <div className="d-flex flex-column">
            <b>Категория</b>
            <span >
              {selected?.category?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col md={3}>
          <div className="d-flex flex-column">
            <b>Группа</b>
            <span className={`${tagFormState.id==selected?.tag?.id ? 'text-secondary' : 'text-danger'}`}>
              {selected?.tag?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
          <TooltipButton
            tooltip='удалить'
            variant='danger'
            onClick={()=>removeProductTagProductForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default ProductTagProductForm;