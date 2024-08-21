import {Col, Form, Row} from 'react-bootstrap'
import NameInput from './NameInput';
import { DataAction } from '../../models/index';
import { IngredientCategoryDTO } from '../../api/ingredientCategories';
import Select from './Select';

interface SelectCreateGroupProps {
  selectedId: number
  name: string
  label: string
  dataAction: DataAction
  items: IngredientCategoryDTO[]
  setDataAction: (action:DataAction)=>void
  setName: (name:string)=>void
  setId: (id:number)=>void
}

function SelectCreateGroup({
  selectedId,
  name,
  label,
  dataAction,
  items,
  setDataAction,
  setName,
  setId
}: SelectCreateGroupProps) 
{
  const isCreateCategory = dataAction === DataAction.Create

  return (
    <div>
    <div className='d-flex justify-content-between'>
        <Form.Label><b>{label}</b></Form.Label>
        <div className='d-flex'>
        <small className='mx-1'><i>создать</i></small>
        <Form.Check
          type="switch"
          defaultChecked={isCreateCategory}
          onChange={(e)=>setDataAction(
            e.target.checked 
            ? DataAction.Create
            : DataAction.None
          )}
          />
        </div>
    </div>
    <div className='px-1'>
    {
      isCreateCategory
      ? 
      <NameInput
      name={name}
      setName={setName}
      />
      :
      <Select
      items={items}
      selectedId={selectedId}
      setId={setId}
      />
    }
    </div>
    </div>
  )
}

export {SelectCreateGroup, SelectCreateGroup as default};