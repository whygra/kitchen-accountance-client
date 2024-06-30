import {Form} from 'react-bootstrap'
import ProductSelect from './ProductSelect';
import NameInput from './NameInput';

interface SelectCreateGroupProps {
  productId: number
  newProductName: string
  isCreateProduct: boolean
  onIsCreateChange: (isCreate:boolean)=>void
  onNameChange: (name:string)=>void
  onProductChange: (id:number)=>void
}

function SelectCreateGroup({
  productId,
  newProductName,
  isCreateProduct,
  onIsCreateChange,
  onNameChange,
  onProductChange
}: SelectCreateGroupProps) 
{

  return (
    <>
      <Form.Check
        type="switch"
        label="Создать новый"
        defaultChecked={isCreateProduct}
        onChange={(e)=>onIsCreateChange(e.target.checked)}
      />
    {
      isCreateProduct
      ? 
      <NameInput
        name={newProductName}
        handleNameChange={onNameChange}
      />
      :
      <ProductSelect
        productId={productId}
        handleProductChange={onProductChange}
      />
    }
    </>
  )
}

export default SelectCreateGroup;