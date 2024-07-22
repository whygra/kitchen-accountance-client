import {Form} from 'react-bootstrap'
import ProductSelect from './ProductSelect';
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import { ProductDTO } from '../../../api/products';

interface SelectCreateGroupProps {
  productId: number
  newProductName: string
  submitAction: DataAction
  products: ProductDTO[]
  setDataAction: (action:DataAction)=>void
  onNameChange: (name:string)=>void
  onProductChange: (id:number)=>void
}

function SelectCreateGroup({
  productId,
  newProductName,
  submitAction,
  products,
  setDataAction,
  onNameChange,
  onProductChange
}: SelectCreateGroupProps) 
{
  const isCreateProduct = submitAction === DataAction.Create

  return (
    <div className='d-flex justify-content-around'>
      <div>
        <Form.Label className='my-0'><small>Новый</small></Form.Label>
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
        products={products}
        productId={productId}
        onProductChange={onProductChange}
        />
      }
      </div>
    </div>
  )
}

export default SelectCreateGroup;