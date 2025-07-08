import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { UnitDTO } from '../../../api/nomenclature/units';

interface UnitSelectProps {
  unitId : number
  units: UnitDTO[]
  setUnitId : (id : number) => void
}

function UnitSelect({unitId, units, setUnitId} : UnitSelectProps) {

  
  useEffect(()=>{
    setUnitId(units.find(u=>u.id==unitId)?unitId:units[0].id)
  },[])

  return (
    <Form.Select
      value={unitId}
      onChange={e=>setUnitId(parseInt(e.target.value))}
    >
      {units?.map(unit => <option value={unit.id}>{unit.long}</option>)} 
    </Form.Select>
  )
}

export default UnitSelect;