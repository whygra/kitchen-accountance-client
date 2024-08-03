import {Form} from 'react-bootstrap'
import ProductSelect from './ProductSelect';
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import { ProductDTO } from '../../../api/products';

interface SelectCreateGroupProps {
  productId: number
  newProductName: string
  dataAction: DataAction
  products: ProductDTO[]
  setDataAction: (action:DataAction)=>void
  setName: (name:string)=>void
  setProductId: (id:number)=>void
}

function SelectCreateGroup({
  productId,
  newProductName,
  dataAction,
  products,
  setDataAction,
  setName,
  setProductId
}: SelectCreateGroupProps) 
{
  const isCreateProduct = dataAction === DataAction.Create

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
        setName={setName}
        />
        :
        <ProductSelect
        products={products}
        productId={productId}
        setProductId={setProductId}
        />
      }
      </div>
    </div>
  )
}

export {SelectCreateGroup, SelectCreateGroup as default};