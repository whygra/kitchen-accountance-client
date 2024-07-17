import { ReactNode, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getComponentTypes, ComponentTypeDTO } from '../../../api/componentTypes';

interface ComponentTypeSelectProps {
  componentTypeId : number
  handleComponentTypeChange : (id : number) => void
}

function ComponentTypeSelect({componentTypeId, handleComponentTypeChange} : ComponentTypeSelectProps) {

  const [componentTypes, setComponentTypes] = useState(new Array<ComponentTypeDTO>)
  const [isLoading, setIsLoading] = useState(false) 

  async function loadComponentTypes() {
    setIsLoading(true);
    const loaded = await getComponentTypes()
    // TODO: if loaded === null
    setComponentTypes(loaded ?? [])
    setIsLoading(false);
  }

  useEffect(() => 
    {loadComponentTypes()}
  , []);

  function getOptions() : ReactNode {
    return componentTypes.map(componentType => <option value={componentType.id}>{componentType.name}</option>)
  }
  

  return isLoading ? (<>Loading...</>) : (
    <>
      <Form.Group className="mb-3">
        <Form.Label><b>Тип компонента</b></Form.Label>
        <Form.Select
          value={componentTypeId}
          onChange={e=>handleComponentTypeChange(parseInt(e.target.value))}
        >
            {getOptions()}
        </Form.Select>
      </Form.Group>
    </>
  )
}

export default ComponentTypeSelect;