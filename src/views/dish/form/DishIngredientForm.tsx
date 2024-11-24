import {Button, Card, Col, Container, Form, FormControl, FormGroup, FormSelect, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishIngredientFormState, dishIngredientToDTO } from '../../../models/dish/DishFormState'
import 'bootstrap'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { dishFormContext } from '../../../context/dish/DishFormContext'
import TooltipButton from '../../shared/TooltipButton'
import { IngredientDTO } from '../../../api/ingredients'
import TableSelect from '../../shared/selectCreateGroup/TableSelect'
import IngredientTypeSelect from '../../ingredient/form/IngredientTypeSelect'
import IsCreateSwitch from '../../shared/selectCreateGroup/IsCreateSwitch'

interface DishesIngredientFormProps {
  openSelect: (i: DishIngredientFormState)=>void
  formState: DishIngredientFormState,
}

function DishIngredientForm({formState, openSelect}: DishesIngredientFormProps) {

  const {setDishIngredientFormState, removeDishIngredientForm, ingredientTypes, ingredients} = useContext(dishFormContext)

  useEffect(()=>{
    setTypeId(ingredientTypes[0].id)
  },[])

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

  // минимальное допустимое значение ingredient_amount
  // зависит от признака is_item_measured
  const minAmt = selected?.is_item_measured ? 1 : 0.1

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
              
              <IsCreateSwitch
                dataAction={formState.ingredientDataAction}
                setDataAction={setIngredientAction}
              />
            </div>
            {formState.ingredientDataAction == DataAction.Create 
              ? 
              <Row>
              <Col as={Form.Group} className='flex-fill' md={6}>
              <Form.Control
                required
                value={formState.name}
                onChange={(e)=>setNewIngredientName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                введите название
              </Form.Control.Feedback>

              </Col>
              <Col md={6}>
              <IngredientTypeSelect
                typeId={formState.typeId}
                setTypeId={setTypeId}
                ingredientTypes={ingredientTypes}
              />
              </Col>
              </Row>
              : <Form.Group>
                <FormControl 
                  style={{caretColor:'transparent'}}
                  type='text'
                  role="button"
                  placeholder='--не выбран--'
                  onClick={()=>openSelect(formState)} 
                  required
                  value={selected ? `${selected.id}. ${selected.name} ${selected.type?.name}` : ''} 
                />
        
                <Form.Control.Feedback type="invalid">
                  выберите ингредиент
                </Form.Control.Feedback>
                </Form.Group>
            }
            </Col>
            <Col as={Form.Group} md={3}>
            <Form.Label>{formState.isItemMeasured?'Количество':'Вес (грамм)'}</Form.Label>
              <Form.Control
                type="number"
                min={minAmt}
                step={minAmt}
                value={formState.ingredientAmount}
                onChange={e=>setContentPercentage(parseFloat(e.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                введите допустимое значение ( .. ≥ {minAmt} )
              </Form.Control.Feedback>
            </Col>
            <Col as={Form.Group} md={3}>
            <Form.Label>Потери в весе (%)</Form.Label>
            <Form.Control
                type="number"
                min={0}
                max={100}
                step={0.1}
                defaultValue={formState.wastePercentage}
                onChange={e=>setWastePercentage(parseFloat(e.target.value))}
                />
              <Form.Control.Feedback type="invalid">
                введите допустимое значение (от 0 до 100)
              </Form.Control.Feedback>
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