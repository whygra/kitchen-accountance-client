import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/units';
import UnitsTableItem from './UnitsTableItem';

interface TableRowUnitElementProps {
  unit: UnitDTO
}

function TableRowUnitElement({unit} : TableRowUnitElementProps) {
  return (
    <>
      <td>{unit.long}</td>
      <td>{unit.short}</td>
    </>
  )
}

export default TableRowUnitElement;