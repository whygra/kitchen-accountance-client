import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import 'bootstrap'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { dishFormContext } from '../../../context/forms/nomenclature/dish/DishFormContext'
import TooltipButton from '../../shared/TooltipButton'
import { DishDTO } from '../../../api/nomenclature/dishes'
import TableSelect from '../../shared/selectCreateGroup/TableSelect'
import { DishTagDishFormState } from '../../../models/dish/DishTagFormState'
import { dishTagFormContext } from '../../../context/forms/nomenclature/dish/DishTagFormContext'

interface DishTagDishFormProps {
  formState: DishTagDishFormState,
}

function DishTagDishForm({formState}: DishTagDishFormProps) {

  const {formState: tagFormState, removeDishTagDishForm, dishes} = useContext(dishTagFormContext)

  const selected = dishes.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        
      <Col md={5}>
          <div className="d-flex flex-column">
            <b>Блюдо</b>
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
            onClick={()=>removeDishTagDishForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishTagDishForm;