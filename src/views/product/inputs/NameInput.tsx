import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  onNameChange : (name : string)=>void
}

function NameInput(props : NameInputProps) {
  return (
    <Form.Control
      type="text"
      placeholder="Название продукта" 
      value={props.name}
      onChange={e=>props.onNameChange(e.target.value)}
    />
  )
}

export default NameInput;