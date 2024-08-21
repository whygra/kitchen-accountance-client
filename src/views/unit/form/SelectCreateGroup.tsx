import {Col, Form, Row} from 'react-bootstrap'
import UnitSelect from './UnitSelect';
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import { UnitDTO } from '../../../api/units';

interface SelectCreateGroupProps {
  unitId: number
  newUnitShortName: string
  newUnitLongName: string
  dataAction: DataAction
  units: UnitDTO[]
  setDataAction: (action:DataAction)=>void
  setLong: (name:string)=>void
  setShort: (name:string)=>void
  setUnitId: (id:number)=>void
}

function SelectCreateGroup({
  unitId: unitId,
  newUnitShortName,
  newUnitLongName,
  dataAction,
  units,
  setDataAction,
  setLong,
  setShort,
  setUnitId
}: SelectCreateGroupProps) 
{
  const isCreateUnit = dataAction === DataAction.Create

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <Form.Label>Единица измерения</Form.Label>
        <div className='d-flex'>
        <small className='my-0'><i>создать</i></small>
        <Form.Check
          type="switch"
          defaultChecked={isCreateUnit}
          onChange={(e)=>setDataAction(
            e.target.checked 
            ? DataAction.Create
            : DataAction.None
          )}
        />
        </div>
      </div>
      <div>
      {
        isCreateUnit
        ? 
        <NameInput
        short={newUnitShortName}
        long={newUnitLongName}
        setShort={setShort}
        setLong={setLong}
        />
        :
        <UnitSelect
        units={units}
        unitId={unitId}
        setUnitId={setUnitId}
        />
      }
      </div>
    </div>
  )
}

export default SelectCreateGroup;