import { useContext } from 'react';
import {Form} from 'react-bootstrap'
import { context } from '../../../controllers/ComponentFormController';

interface ComponentNameInputProps {
  setName: (name:string)=>void,
  name: string,
}

function NameInput({setName, name}:ComponentNameInputProps) {

  return (

        <Form.Control
          type="text"
          placeholder="Название ингредиента" 
          defaultValue={name}
          onChange={e=>setName(e.target.value)}
        />
  )
}

export default NameInput;