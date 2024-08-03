import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  setName : (name : string)=>void
}

function NameInput(props : NameInputProps) {
  return (
    <Form.Control
      type="text"
      placeholder="Название продукта" 
      value={props.name}
      onChange={e=>props.setName(e.target.value)}
    />
  )
}

export default NameInput;