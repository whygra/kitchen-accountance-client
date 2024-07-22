import {Col, Form, Row} from 'react-bootstrap'
import IngredientNameInput from '../form/IngredientNameInput';
import { DataAction } from '../../../models/index';
import IngredientSelect from './IngredientSelect';
import IngredientTypeSelect from '../form/IngredientTypeSelect';
import { IngredientTypeDTO } from '../../../api/ingredientTypes';
import { GetIngredientWithProductsDTO } from '../../../api/ingredientWithProducts';

interface SelectCreateGroupProps {
  ingredientId: number
  newIngredientName: string
  newIngredientTypeId: number
  dataAction: DataAction
  ingredientTypes: IngredientTypeDTO[]
  ingredients: GetIngredientWithProductsDTO[]
  setIngredientId: (id:number)=>void
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  setDataAction: (action:DataAction)=>void
}

function SelectCreateGroup({
  ingredientId,
  newIngredientName,
  newIngredientTypeId,
  dataAction,
  ingredientTypes,
  ingredients,
  setDataAction,
  setTypeId,
  setName,
  setIngredientId,
}: SelectCreateGroupProps) 
{
  const isCreateProduct = dataAction === DataAction.Create

  return (
    <Row>
      <Col md={3}>
        <Form.Label className='my-0 w-100 text-center'><small>Новый</small></Form.Label>
        <Form.Check
          type="switch"
          className='text-center'
          defaultChecked={isCreateProduct}
          onChange={(e)=>setDataAction(
            e.target.checked 
            ? DataAction.Create
            : DataAction.None
          )}
          />
      </Col>
      {
        isCreateProduct
        ? 
        <>
            <Col className='flex-fill' md={6}>
            <IngredientNameInput
                name={newIngredientName}
                setName={setName}
                />
            </Col>
            <Col md={3}>
            <IngredientTypeSelect
                typeId={newIngredientTypeId}
                setTypeId={setTypeId}
                ingredientTypes={ingredientTypes}
                />
            </Col>
        </>
        :
        <Col md={9}>
        <IngredientSelect
        ingredients={ingredients}
        ingredientId={ingredientId}
        setIngredientId={setIngredientId}
        />
        </Col>
      }
    </Row>
  )
}

export default SelectCreateGroup;