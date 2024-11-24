import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  setName : (name : string)=>void
}

function NameInput(props : NameInputProps) {
  return (
    <Form.Group>

    <Form.Control
      required
      type="text"
      placeholder="Название" 
      value={props.name}
      onChange={e=>props.setName(e.target.value)}
      />
    
    <Form.Control.Feedback type="invalid">
      введите название
    </Form.Control.Feedback>
    </Form.Group>
  )
}

export default NameInput;