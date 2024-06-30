import { ReactNode, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getComponentTypes, ComponentTypeDTO } from '../../api/componentTypes';

interface ComponentTypeSelectProps {
  componentTypeId : number
  handleComponentTypeChange : (id : number) => void
}

function ComponentTypeSelect(props : ComponentTypeSelectProps) {

  const [componentTypes, setComponentTypes] = useState(new Array<ComponentTypeDTO>)
  const [isLoading, setIsLoading] = useState(false) 

  async function loadComponentTypes() {
    setIsLoading(true);
    const loaded = await getComponentTypes()
    // TODO: if loaded === null
    setComponentTypes(loaded ?? [])
    setIsLoading(false);
  }

  function getOptions() : ReactNode {
    return componentTypes.map(componentType => <option value={componentType.id}>{componentType.name}</option>)
  }

  useEffect(() => 
    {loadComponentTypes()}
  , []);
  

  return isLoading ? (<>Loading...</>) : (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Тип компонента</Form.Label>
        <Form.Select
          value={props.componentTypeId}
          onChange={e=>props.handleComponentTypeChange(parseInt(e.target.value))}
        >
            {getOptions()}
        </Form.Select>
      </Form.Group>
    </>
  )
}

export default ComponentTypeSelect;