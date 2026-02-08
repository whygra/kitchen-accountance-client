import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { IngredientTagIngredientFormState } from '../../../models/ingredient/IngredientTagFormState'
import 'bootstrap'
import { useContext } from 'react'
import { ingredientTagFormContext } from '../../../context/forms/nomenclature/ingredient/IngredientTagFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface IngredientTagIngredientFormProps {
  formState: IngredientTagIngredientFormState,
}

function IngredientTagIngredientForm({formState}: IngredientTagIngredientFormProps) {

  const {formState: tagFormState, removeIngredientTagIngredientForm, ingredients} = useContext(ingredientTagFormContext)

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
            onClick={()=>removeIngredientTagIngredientForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default IngredientTagIngredientForm;