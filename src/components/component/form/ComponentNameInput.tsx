import { useContext } from 'react';
import {Form} from 'react-bootstrap'
import { context } from '../../../controllers/ComponentFormController';

function NameInput() {
  const {setName, formState} = useContext(context);
  
  const name = formState.name

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label><b>Название компонента</b></Form.Label>
        <Form.Control
          type="text"
          placeholder="Название компонента" 
          defaultValue={name}
          onChange={e=>setName(e.target.value)}
        />
      </Form.Group>
    </>
  )
}

export default NameInput;