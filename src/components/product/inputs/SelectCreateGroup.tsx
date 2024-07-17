import {Form} from 'react-bootstrap'
import ProductSelect from './ProductSelect';
import NameInput from './NameInput';
import { SubmitActionType } from '../../../models/index';

interface SelectCreateGroupProps {
  productId: number
  newProductName: string
  submitAction: SubmitActionType
  onSubmitActionChange: (action:SubmitActionType)=>void
  onNameChange: (name:string)=>void
  onProductChange: (id:number)=>void
}

function SelectCreateGroup({
  productId,
  newProductName,
  submitAction,
  onSubmitActionChange,
  onNameChange,
  onProductChange
}: SelectCreateGroupProps) 
{
  const isCreateProduct = submitAction === SubmitActionType.Create

  return (
    <div className='d-flex justify-content-around'>
      <div>
        <Form.Label className='my-0'><small>Новый</small></Form.Label>
        <Form.Check
          type="switch"
          className='text-center'
          defaultChecked={isCreateProduct}
          onChange={(e)=>onSubmitActionChange(
            e.target.checked 
            ? SubmitActionType.Create
            : SubmitActionType.None
          )}
        />
      </div>
      <div>
      {
        isCreateProduct
        ? 
        <NameInput
        name={newProductName}
        onNameChange={onNameChange}
        />
        :
        <ProductSelect
        productId={productId}
        onProductChange={onProductChange}
        />
      }
      </div>
    </div>
  )
}

export default SelectCreateGroup;