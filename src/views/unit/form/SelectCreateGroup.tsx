import {Col, Form, Row} from 'react-bootstrap'
import UnitSelect from './UnitSelect';
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import { UnitDTO } from '../../../api/nomenclature/units';
import { useEffect } from 'react';
import IsCreateSwitch from '../../shared/selectCreateGroup/IsCreateSwitch';

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
  unitId,
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
    <div className='mb-3'>
      <div className='d-flex justify-content-between'>
        <Form.Label>Единица измерения</Form.Label>
        <IsCreateSwitch
          dataAction={dataAction}
          setDataAction={setDataAction}
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

export default SelectCreateGroup;