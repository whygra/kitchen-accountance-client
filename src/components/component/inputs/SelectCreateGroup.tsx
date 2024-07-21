import {Col, Form, Row} from 'react-bootstrap'
import ComponentNameInput from '../form/ComponentNameInput';
import { DataAction } from '../../../models/index';
import ComponentSelect from './ComponentSelect';
import ComponentTypeSelect from '../form/ComponentTypeSelect';
import { ComponentTypeDTO } from '../../../api/componentTypes';
import { GetComponentWithProductsDTO } from '../../../api/componentWithProducts';

interface SelectCreateGroupProps {
  componentId: number
  newComponentName: string
  newComponentTypeId: number
  dataAction: DataAction
  componentTypes: ComponentTypeDTO[]
  components: GetComponentWithProductsDTO[]
  setComponentId: (id:number)=>void
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  setDataAction: (action:DataAction)=>void
}

function SelectCreateGroup({
  componentId,
  newComponentName,
  newComponentTypeId,
  dataAction,
  componentTypes,
  components,
  setDataAction,
  setTypeId,
  setName,
  setComponentId,
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
            <ComponentNameInput
                name={newComponentName}
                setName={setName}
                />
            </Col>
            <Col md={3}>
            <ComponentTypeSelect
                typeId={newComponentTypeId}
                setTypeId={setTypeId}
                componentTypes={componentTypes}
                />
            </Col>
        </>
        :
        <Col md={9}>
        <ComponentSelect
        components={components}
        componentId={componentId}
        setComponentId={setComponentId}
        />
        </Col>
      }
    </Row>
  )
}

export default SelectCreateGroup;