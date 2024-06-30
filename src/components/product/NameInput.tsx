import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  handleNameChange : (name : string)=>void
}

function NameInput(props : NameInputProps) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Название продукта</Form.Label>
        <Form.Control
          type="text"
          placeholder="Название продукта" 
          value={props.name}
          onChange={e=>props.handleNameChange(e.target.value)}
        />
      </Form.Group>
    </>
  )
}

export default NameInput;