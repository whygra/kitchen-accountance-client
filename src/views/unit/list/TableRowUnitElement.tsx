import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/units';

interface TableRowUnitElementProps {
  unit: UnitDTO
}

function TableRowUnitElement({unit} : TableRowUnitElementProps) {
  return (
    <>
      <td>{unit.id}</td>
      <td>{unit.short}</td>
      <td>{unit.long}</td>
    </>
  )
}

export default TableRowUnitElement;