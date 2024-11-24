import {Col, Form, Row} from 'react-bootstrap'
import { DataAction } from '../../../models/index';
import { ProductDTO } from '../../../api/products';

interface ItemWeightInputProps {
  weight: number
  isItemMeasured: boolean
  setWeight: (weight:number)=>void
  setIsItemMeasured: (value:boolean)=>void
}

function ItemWeightInput({
  weight,
  isItemMeasured,
  setWeight,
  setIsItemMeasured,
}: ItemWeightInputProps) 
{

  return (
    <div>
      <div className='d-flex'>
          <Form.Label><b>Штучный ингредиент</b></Form.Label>
          <Form.Check
            type="switch"
            defaultChecked={isItemMeasured}
            onChange={(e)=>setIsItemMeasured(
              e.target.checked
            )}
            />
      </div>
      <div>
        
      {
        isItemMeasured
        ? 
        <Form.Group>
          <Form.Label><b>Вес 1 шт. в граммах</b></Form.Label>
          <Form.Control
            required
            type='number'
            min={0.1}
            step={0.1}
            defaultValue={weight}
            onChange={(e)=>setWeight(parseFloat(e.target.value))}
          />
          
          <Form.Control.Feedback type="invalid">
            введите допустимое значение ( .. ≥ 0.1)
          </Form.Control.Feedback>
        </Form.Group>
        :
        <></>
      }
      </div>
    </div>
  )
}

export default ItemWeightInput;