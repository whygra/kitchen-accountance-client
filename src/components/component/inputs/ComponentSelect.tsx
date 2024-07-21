import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { GetComponentWithProductsDTO, getComponentsWithProducts } from '../../../api/componentWithProducts';

interface ComponentSelectProps {
  componentId : number
  setComponentId : (id : number) => void
  components : GetComponentWithProductsDTO[]
}

function ComponentSelect({componentId, setComponentId, components} : ComponentSelectProps) {

  return (
    <Form.Select
      value={componentId}
      onChange={e=>setComponentId(parseInt(e.target.value))}
    >
      {components.map(c => <option value={c.id}>{`${c.id}. ${c.name} ${c.type.name}`}</option>)} 
    </Form.Select>
  )
}

export default ComponentSelect;