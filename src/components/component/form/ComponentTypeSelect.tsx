import { ReactNode, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getComponentTypes, ComponentTypeDTO } from '../../../api/componentTypes';
import { context } from '../../../controllers/ComponentFormController';

function ComponentTypeSelect() {

  const {setTypeId, formState} = useContext(context)

  const typeId = formState.componentTypeId

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
          defaultValue={typeId}
          onChange={e=>setTypeId(parseInt(e.target.value))}
        >
            {getOptions()}
        </Form.Select>
      </Form.Group>
    </>
  )
}

export default ComponentTypeSelect;