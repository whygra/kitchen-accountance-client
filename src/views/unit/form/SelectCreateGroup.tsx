import {Form} from 'react-bootstrap'
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
    <div className='d-flex justify-content-around'>
      <div>
        <Form.Label className='my-0'><small>Новая</small></Form.Label>
        <Form.Check
          type="switch"
          className='text-center'
          defaultChecked={isCreateUnit}
          onChange={(e)=>setDataAction(
            e.target.checked 
            ? DataAction.Create
            : DataAction.None
          )}
        />
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

export {SelectCreateGroup, SelectCreateGroup as default};