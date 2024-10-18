import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  setName : (name : string)=>void
}

function NameInput(props : NameInputProps) {
  return (
    <Form.Control
      required
      type="text"
      placeholder="Название" 
      value={props.name}
      onChange={e=>props.setName(e.target.value)}
    />
  )
}

export default NameInput;