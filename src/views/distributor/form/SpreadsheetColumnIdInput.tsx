import NameInput from './DistributorNameInput';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/forms/distributor/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';
import { ColumnIndex } from './SpreasheetUploadForm';

interface FileColumnIdInputProps {
    columnIndex: ColumnIndex
    onIdChanged: (data:ColumnIndex)=>void
}

function SpreadsheetColumnIdInput({onIdChanged, columnIndex}:FileColumnIdInputProps) 
{  
    const [index, setIndex] = useState(columnIndex.index)
    const [include, setInclude] = useState(true)
  return (
    <Form.Group as={Col} className='d-flex flex-column justify-content-between'>
      <div className='d-flex justify-content-between'>
        <Form.Label><small>{columnIndex.viewName}</small></Form.Label>
        <Form.Check className='px-2' checked={include} onChange={(e)=>{setInclude(e.target.checked); onIdChanged({...columnIndex, index: undefined})}}/>
      </div>
        <Form.Control
            type='number'
            min={1}
            disabled={!include}
            required={include}
            value={index}
            onChange={(e)=>{
              setIndex(parseInt(e.target.value))
              onIdChanged({...columnIndex, index: parseInt(e.target.value)})
            }}
        />
        <Form.Control.Feedback type="invalid">
          введите номер столбца ( .. ≥ 1 )
        </Form.Control.Feedback>
    </Form.Group>
    )
}

export default SpreadsheetColumnIdInput