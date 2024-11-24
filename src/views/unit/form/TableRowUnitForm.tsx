import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/units'

interface TableRowUnitFormProps {
  unit: UnitDTO
  setUnit: (unit:UnitDTO)=>void
}

function TableRowUnitForm({unit, setUnit} : TableRowUnitFormProps) {
    
  function setShort(name:string) {
    setUnit({...unit, short:name})
  } 
  
  function setLong(name:string) {
    setUnit({...unit, long:name})
  }

  return (
    <>
      <td>{unit.id}</td>
      <Form.Group as='td'>
      <Form.Control
        required
        type="text"
        placeholder="Краткое название"
        value={unit.short}
        onChange={e => setShort(e.target.value)} />
      <Form.Control.Feedback type="invalid">
        введите краткое название
      </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as='td'>
      <Form.Control
        required
        type="text"
        placeholder="Полное название"
        value={unit.long}
        onChange={e => setLong(e.target.value)} />
      <Form.Control.Feedback type="invalid">
        введите полное название
      </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default TableRowUnitForm;