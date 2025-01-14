import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { IngredientCategoryIngredientFormState } from '../../../models/ingredient/IngredientCategoryFormState'
import 'bootstrap'
import { useContext } from 'react'
import { ingredientCategoryFormContext } from '../../../context/forms/ingredient/IngredientCategoryFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface IngredientCategoryIngredientFormProps {
  formState: IngredientCategoryIngredientFormState,
}

function IngredientCategoryIngredientForm({formState}: IngredientCategoryIngredientFormProps) {

  const {formState: categoryFormState, removeIngredientCategoryIngredientForm, ingredients} = useContext(ingredientCategoryFormContext)

  const selected = ingredients.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={5}>
          <div className="d-flex flex-column">
            <b>Ингредиент</b>
            <span>
              {selected?.name} {selected?.type?.name}
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
            onClick={()=>removeIngredientCategoryIngredientForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default IngredientCategoryIngredientForm;