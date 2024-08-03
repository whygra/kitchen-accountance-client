import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { getProducts, ProductDTO } from '../../../api/products';
import { UnitDTO } from '../../../api/units';

interface UnitSelectProps {
  unitId : number
  units: UnitDTO[]
  setUnitId : (id : number) => void
}

function UnitSelect({unitId, units, setUnitId} : UnitSelectProps) {


  return (
    <Form.Select
      value={unitId}
      onChange={e=>setUnitId(parseInt(e.target.value))}
    >
      {units?.map(unit => <option value={unit.id}>{`${unit.id}. ${unit.long}`}</option>)} 
    </Form.Select>
  )
}

export default UnitSelect;