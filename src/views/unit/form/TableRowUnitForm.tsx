import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/units'
import UnitsTableItem from '../list/UnitsTableItem'
import GridTableRow, { WindowSize } from '../../shared/GridTableRow'

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
      <td>

      <Form.Group>
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
      </td>
      <td>
        <Form.Group>
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
      </td>
    </>      
  )
}

export default TableRowUnitForm;