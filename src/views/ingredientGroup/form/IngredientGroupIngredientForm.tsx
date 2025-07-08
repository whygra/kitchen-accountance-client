import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { IngredientGroupIngredientFormState } from '../../../models/ingredient/IngredientGroupFormState'
import 'bootstrap'
import { useContext } from 'react'
import { ingredientGroupFormContext } from '../../../context/forms/nomenclature/ingredient/IngredientGroupFormContext'
import TooltipButton from '../../shared/TooltipButton'

interface IngredientGroupIngredientFormProps {
  formState: IngredientGroupIngredientFormState,
}

function IngredientGroupIngredientForm({formState}: IngredientGroupIngredientFormProps) {

  const {formState: groupFormState, removeIngredientGroupIngredientForm, ingredients} = useContext(ingredientGroupFormContext)

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
            <span className={`${groupFormState.id==selected?.group?.id ? 'text-secondary' : 'text-danger'}`}>
              {selected?.group?.name ?? '-нет-'}
            </span>
          </div>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
          <TooltipButton
            tooltip='удалить'
            variant='danger'
            onClick={()=>removeIngredientGroupIngredientForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default IngredientGroupIngredientForm;