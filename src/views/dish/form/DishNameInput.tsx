import {Form} from 'react-bootstrap'

interface NameInputProps {
  name: string,
  setName: (name:string)=>void
}

function NameInput({name, setName}: NameInputProps) {

  return (
    <Form.Control
      type="text"
      placeholder="Название блюда" 
      defaultValue={name}
      onChange={e=>setName(e.target.value)}
    />
  )
}

export default NameInput;