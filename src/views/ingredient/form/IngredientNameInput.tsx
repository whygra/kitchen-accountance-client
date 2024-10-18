import {Form} from 'react-bootstrap'

interface IngredientNameInputProps {
  setName: (name:string)=>void,
  name: string,
}

function NameInput({setName, name}:IngredientNameInputProps) {
  return (
    <Form.Control
      type="text"
      placeholder="Название ингредиента" 
      value={name}
      onChange={e=>setName(e.target.value)}
    />
  )
}

export default NameInput;