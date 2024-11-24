import {Col, Form, Row} from 'react-bootstrap'
import NameInput from './NameInput';
import { DataAction } from '../../../models/index';
import Select from './Select';
import { NamedEntity } from '../../../api/constants';

interface IsCreateSwitchProps {
  dataAction: DataAction
  setDataAction: (action:DataAction)=>void
}

function IsCreateSwitch({
  dataAction,
  setDataAction,
}: IsCreateSwitchProps) 
{
  const isCreate = dataAction === DataAction.Create
  
  return (
    <div className='d-flex'>
    <small className='mx-1'>создать</small>
    <Form.Check
      formNoValidate={false}
      type="switch"
      checked={isCreate}
      onChange={(e)=>setDataAction(
        e.target.checked 
        ? DataAction.Create
        : DataAction.None
      )}
      />
    </div>
  )
}

export default IsCreateSwitch;