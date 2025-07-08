import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { ProductCategoryProductFormState } from '../../../models/product/ProductCategoryFormState'
import 'bootstrap'
import { useContext } from 'react'
import { productCategoryFormContext } from '../../../context/forms/nomenclature/product/ProductCategoryFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface ProductCategoryProductFormProps {
  formState: ProductCategoryProductFormState,
}

function ProductCategoryProductForm({formState}: ProductCategoryProductFormProps) {

  const {formState: categoryFormState, removeProductCategoryProductForm, products} = useContext(productCategoryFormContext)

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
            <span className={`${categoryFormState.id==selected?.category?.id ? 'text-secondary' : 'text-danger'}`}>
              {selected?.category?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col md={3}>
          <div className="d-flex flex-column">
            <b>Группа</b>
            <span>
              {selected?.group?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
          <TooltipButton
            tooltip='удалить'
            variant='danger'
            onClick={()=>removeProductCategoryProductForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default ProductCategoryProductForm;