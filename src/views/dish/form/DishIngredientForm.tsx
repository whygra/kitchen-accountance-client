import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishIngredientFormState, dishIngredientToDTO } from '../../../models/DishFormState'
import 'bootstrap'
import { ReactElement, useContext, useState } from 'react'
import { dishFormContext } from '../../../context/DishFormContext'
import TooltipButton from '../../shared/TooltipButton'
import { IngredientDTO } from '../../../api/ingredients'
import TableSelect from '../../shared/selectCreateGroup/TableSelect'
import IngredientTypeSelect from '../../ingredient/form/IngredientTypeSelect'

interface DishesIngredientFormProps {
  openSelect: (i: DishIngredientFormState)=>void
  formState: DishIngredientFormState,
}

function DishIngredientForm({formState, openSelect}: DishesIngredientFormProps) {

    const {setDishIngredientFormState, removeDishIngredientForm, ingredientTypes, ingredients} = useContext(dishFormContext)

  function setNewIngredientName(name:string) {
    setDishIngredientFormState({...formState, name: name})
  }

  function setIngredientAction(action:DataAction) {
    setDishIngredientFormState({...formState, ingredientDataAction: action})
  }

  function setTypeId(id:number) {
    setDishIngredientFormState({...formState, typeId: id})
  }

  function setContentPercentage(contentPercentage:number) {
    setDishIngredientFormState({...formState, ingredientAmount: contentPercentage})
  }

  function setWastePercentage(wastePercentage:number) {
    setDishIngredientFormState({...formState, wastePercentage: wastePercentage})
  }

  const selected = ingredients.find(i=>i.id==formState.id)

  return ( 
    <Card className='w-100 p-3'>
      <Row>
        <Col md={11}
        style={formState.ingredientDataAction==DataAction.Delete ? {pointerEvents: "none", opacity: "0.4"} : {}}
        >
          <Row>

            <Col md={6}>
            <div className="d-flex flex-row justify-content-between">
              <b>Ингредиент</b>
              <Form.Switch 
                checked={formState.ingredientDataAction==DataAction.Create} 
                onChange={(e)=>setIngredientAction(e.target.checked?DataAction.Create:DataAction.None)}
                label={<small>создать</small>}
              />
            </div>
            {formState.ingredientDataAction == DataAction.Create 
              ? 
              <Row>
              <Col className='flex-fill' md={6}>
              <Form.Control
                  value={formState.name}
                  onChange={(e)=>setNewIngredientName(e.target.value)}
                  />
              </Col>
              <Col md={6}>
              <IngredientTypeSelect
                  typeId={formState.typeId}
                  setTypeId={setTypeId}
                  ingredientTypes={ingredientTypes}
                  />
              </Col>
          </Row>
              : <Button variant='none' onClick={()=>openSelect(formState)}>
                {selected ? `${selected.id}. ${selected.name} ${selected.type.name}` : 'не выбран'}
                </Button>
            }
            </Col>
            <Col md={3}>
            <Form.Label>{formState.itemWeight!=1?'Количество':'Вес (грамм)'}</Form.Label>
            <Form.Control
                type="number"
                min={0.5}
                step={0.1}
                value={formState.ingredientAmount}
                onChange={e=>setContentPercentage(parseFloat(e.target.value))}
                />
            </Col>
            <Col md={3}>
            <Form.Label>Потери в весе (%)</Form.Label>
            <Form.Control
                type="number"
                min={0}
                max={100}
                step={0.5}
                defaultValue={formState.wastePercentage}
                onChange={e=>setWastePercentage(parseFloat(e.target.value))}
                />
            </Col>
          </Row>
        </Col>
        <Col md={1} className='d-flex justify-content-end'>
          <TooltipButton
            tooltip='удалить'
            variant='danger'
            onClick={()=>removeDishIngredientForm(formState.key)}
          ><i className='bi bi-x-lg'/></TooltipButton>
          
        </Col>
      </Row>
    </Card>
  )
}

export default DishIngredientForm;