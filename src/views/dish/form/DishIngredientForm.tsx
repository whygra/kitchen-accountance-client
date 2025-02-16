import {Button, Card, Col, Container, Form, FormControl, FormGroup, FormSelect, Row, Table} from 'react-bootstrap'
import { DataAction } from '../../../models'
import { DishIngredientFormState, dishIngredientToDTO } from '../../../models/dish/DishFormState'
import 'bootstrap'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { dishFormContext } from '../../../context/forms/dish/DishFormContext'
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

  const [netWeight, setNetWeight] = useState(formState.itemWeight*formState.ingredientAmount*(100 - formState.wastePercentage)/100)
  const [grossWeight, setGrossWeight] = useState(formState.itemWeight*formState.ingredientAmount)

  function handleNetWeightChange(value: number){
    setNetWeight(value)
    setDishIngredientFormState({...formState, wastePercentage: 100 - value/(formState.itemWeight*formState.ingredientAmount)*100})
  }

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

  function setIngredientAmount(ingredientAmount:number) {
    setGrossWeight(formState.itemWeight*ingredientAmount)
    setDishIngredientFormState({...formState, ingredientAmount, wastePercentage: 100 - netWeight/(formState.itemWeight*ingredientAmount)*100})
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
            <Col className='mb-2' md={6}>
            <div className="d-flex flex-row justify-content-between mb-2">
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
                  value={selected ? `${selected.name} ${selected.type?.name}` : ''} 
                />
        
                <Form.Control.Feedback type="invalid">
                  выберите ингредиент
                </Form.Control.Feedback>
                </Form.Group>
            }

            </Col>
            <Col className='mb-2' as={Form.Group} md={3}>

              <Form.Group>

              <Form.Label>{formState.isItemMeasured?'Количество':'Масса брутто'}</Form.Label>
              <Form.Control
                required
                type="number"
                min={minAmt}
                step={minAmt}
                value={formState.ingredientAmount}
                onChange={e=>setIngredientAmount(parseFloat(e.target.value))}
                />
              <Form.Control.Feedback type="invalid">
                введите допустимое значение ( .. ≥ {minAmt} )
              </Form.Control.Feedback>
              </Form.Group>

            </Col>
            {
                formState.isItemMeasured
                ? <Col className='mb-2' as={Form.Group} md={3}>

                <Form.Group>
  
                <Form.Label>Масса брутто</Form.Label>
                  <p className='ps-1 pt-1 text-success'>
                    {(grossWeight).toFixed(2)}
                  </p>
                </Form.Group>
  
                </Col>
                : <></>
            }
            
            
            <Col className='mb-2' as={Form.Group} md={3}>
              
            <Form.Label>Масса нетто</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={formState.ingredientAmount*formState.itemWeight}
                  step={0.01}
                  value={netWeight}
                  onChange={e=>handleNetWeightChange(parseFloat(e.target.value))}
                />
              <Form.Control.Feedback type="invalid">
                введите допустимое значение ( {grossWeight.toFixed(2)} ≥ .. ≥ 0 )
              </Form.Control.Feedback>
            </Col>
            <Col className='mb-2' as={Form.Group} md={3}>
              
              <Form.Label>Отход</Form.Label>                
              <p className='ps-1 pt-1 text-success'>
                {formState.wastePercentage.toFixed(2)}%
              </p>
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