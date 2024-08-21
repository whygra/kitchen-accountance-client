import {Col, Form, Row} from 'react-bootstrap'
import ProductSelect from './ProductSelect';
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import { ProductDTO } from '../../../api/products';

interface SelectCreateGroupProps {
  productId: number
  name: string
  dataAction: DataAction
  products: ProductDTO[]
  setDataAction: (action:DataAction)=>void
  setName: (name:string)=>void
  setProductId: (id:number)=>void
}

function SelectCreateGroup({
  productId,
  name: newProductName,
  dataAction,
  products,
  setDataAction,
  setName,
  setProductId
}: SelectCreateGroupProps) 
{
  const isCreateProduct = dataAction === DataAction.Create

  return (
    <div>
      <div className='d-flex justify-content-between'>
          <Form.Label><b>Продукт</b></Form.Label>
          <div className='d-flex'>
          <small className='my-0'><i>создать</i></small>
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
      <div>
        
      {
        isCreateProduct
        ? 
        <div>
          <NameInput
          name={newProductName}
          setName={setName}
          />
        </div>
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

export default SelectCreateGroup;