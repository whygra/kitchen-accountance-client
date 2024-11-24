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
      <Form.Group>
      <Form.Control
        required
        type="text"
        placeholder="Краткое название"
        value={short}
        onChange={e => setShort(e.target.value)} />
      <Form.Control.Feedback type="invalid">
        введите краткое название
      </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
      <Form.Control
        required
        type="text"
        placeholder="Полное название"
        value={long}
        onChange={e => setLong(e.target.value)} />
      <Form.Control.Feedback type="invalid">
        введите полное название
      </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default NameInput;