import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/units';
import UnitsTableItem from './UnitsTableItem';

interface TableRowUnitElementProps {
  unit: UnitDTO
}

function TableRowUnitElement({unit} : TableRowUnitElementProps) {
  return (
    <UnitsTableItem unit={unit}/>
  )
}

export default TableRowUnitElement;