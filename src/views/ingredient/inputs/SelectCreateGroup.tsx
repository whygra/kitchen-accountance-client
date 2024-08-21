import {Col, Form, Row} from 'react-bootstrap'
import IngredientNameInput from '../form/IngredientNameInput';
import { DataAction } from '../../../models/index';
import IngredientSelect from './IngredientSelect';
import IngredientTypeSelect from '../form/IngredientTypeSelect';
import { IngredientTypeDTO } from '../../../api/ingredientTypes';
import { IngredientDTO, IngredientWithProductsDTO } from '../../../api/ingredients';

interface SelectCreateGroupProps {
  ingredientId: number
  newIngredientName: string
  newIngredientTypeId: number
  dataAction: DataAction
  ingredientTypes: IngredientTypeDTO[]
  ingredients: IngredientDTO[]
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
    <div>
      <div className='d-flex justify-content-between'>
          <Form.Label><b>Ингредиент</b></Form.Label>
          <div className='d-flex'>
          <small className='mx-1'><i>создать</i></small>
          <Form.Check
            type="switch"
            defaultChecked={dataAction==DataAction.Create}
            onChange={(e)=>setDataAction(
              e.target.checked 
              ? DataAction.Create
              : DataAction.None
            )}
            />
          </div>
      </div>
      {
        isCreateProduct
        ? 
        <Row>
            <Col className='flex-fill' md={6}>
            <IngredientNameInput
                name={newIngredientName}
                setName={setName}
                />
            </Col>
            <Col md={6}>
            <IngredientTypeSelect
                typeId={newIngredientTypeId}
                setTypeId={setTypeId}
                ingredientTypes={ingredientTypes}
                />
            </Col>
        </Row>
        :
        <IngredientSelect
        ingredients={ingredients}
        ingredientId={ingredientId}
        setIngredientId={setIngredientId}
        />
      }
    </div>
  )
}

export default SelectCreateGroup;