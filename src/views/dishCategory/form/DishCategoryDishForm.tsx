import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DishCategoryDishFormState } from '../../../models/dish/DishCategoryFormState'
import 'bootstrap'
import { useContext } from 'react'
import { dishCategoryFormContext } from '../../../context/dish/DishCategoryFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface DishCategoryDishFormProps {
  formState: DishCategoryDishFormState,
}

function DishCategoryDishForm({formState}: DishCategoryDishFormProps) {

  const {formState: categoryFormState, removeDishCategoryDishForm, dishes} = useContext(dishCategoryFormContext)

  const selected = dishes.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col sm={5}>
          <div className="d-flex flex-column">
            <b>Блюдо</b>
            <span>
              {selected?.id}. {selected?.name}
            </span>
          </div>
        </Col>
        <Col sm={3}>
          <div className="d-flex flex-column">
            <b>Категория</b>
            <span className={`${categoryFormState.id==selected?.category?.id ? 'text-secondary' : 'text-danger'}`}>
              {selected?.category?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col sm={3}>
          <div className="d-flex flex-column">
            <b>Группа</b>
            <span>
              {selected?.group?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col sm={1} className='d-flex justify-content-end'>
          <TooltipButton
            tooltip='удалить'
            variant='danger'
            onClick={()=>removeDishCategoryDishForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishCategoryDishForm;