import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import 'bootstrap'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { dishFormContext } from '../../../context/dish/DishFormContext'
import TooltipButton from '../../shared/TooltipButton'
import { DishDTO } from '../../../api/dishes'
import TableSelect from '../../shared/selectCreateGroup/TableSelect'
import { DishGroupDishFormState } from '../../../models/dish/DishGroupFormState'
import { dishGroupFormContext } from '../../../context/dish/DishGroupFormContext'

interface DishGroupDishFormProps {
  formState: DishGroupDishFormState,
}

function DishGroupDishForm({formState}: DishGroupDishFormProps) {

  const {formState: groupFormState, removeDishGroupDishForm, dishes} = useContext(dishGroupFormContext)

  const selected = dishes.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        
      <Col md={5}>
          <div className="d-flex flex-column">
            <b>Ингредиент</b>
            <span>
              {selected?.id}. {selected?.name}
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
            onClick={()=>removeDishGroupDishForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishGroupDishForm;