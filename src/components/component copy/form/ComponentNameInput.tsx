import {Form} from 'react-bootstrap'

interface NameInputProps {
  name : string
  handleNameChange : (name : string)=>void
}

function NameInput({handleNameChange, name} : NameInputProps) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label><b>Название компонента</b></Form.Label>
        <Form.Control
          type="text"
          placeholder="Название компонента" 
          value={name}
          onChange={e=>handleNameChange(e.target.value)}
        />
      </Form.Group>
    </>
  )
}

export default NameInput;