import { ReactNode, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getComponentTypes, ComponentTypeDTO } from '../../../api/componentTypes';
import { context } from '../../../controllers/ComponentFormController';

interface ComponentTypeSelectProps {
  typeId: number,
  setTypeId: (id:number)=>void,
  componentTypes: ComponentTypeDTO[],
}

function ComponentTypeSelect({componentTypes, typeId, setTypeId}: ComponentTypeSelectProps) {

  function getOptions() : ReactNode {
    return componentTypes.map(componentType => <option value={componentType.id}>{componentType.name}</option>)
  }
  
  return (
        <Form.Select
          defaultValue={typeId}
          onChange={e=>setTypeId(parseInt(e.target.value))}
        >
            {getOptions()}
        </Form.Select>
  )
}

export default ComponentTypeSelect;