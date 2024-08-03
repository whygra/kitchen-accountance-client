import {Form} from 'react-bootstrap'

interface NameInputProps {
  long : string
  short : string
  setShort : (name : string)=>void
  setLong : (name : string)=>void
}

function NameInput({long, short, setShort, setLong} : NameInputProps) {
  return (
    <>
      <Form.Control
        type="text"
        placeholder="Краткое название"
        value={short}
        onChange={e => setShort(e.target.value)} />
      <Form.Control
        type="text"
        placeholder="Полное название"
        value={long}
        onChange={e => setLong(e.target.value)} />
    </>
  )
}

export default NameInput;