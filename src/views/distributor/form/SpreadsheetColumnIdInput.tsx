import NameInput from './DistributorNameInput';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
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
    <Col>
        <Form.Label>{columnIndex.viewName}</Form.Label>
        <Form.Check checked={include} onChange={(e)=>{setInclude(e.target.checked); onIdChanged({...columnIndex, index: undefined})}}/>
        <Form.Control
            type='number'
            min={1}
            disabled={!include}
            value={index}
            onChange={(e)=>{setIndex(parseInt(e.target.value));onIdChanged({...columnIndex, index: parseInt(e.target.value)})}}
        />
    </Col>
    )
}

export default SpreadsheetColumnIdInput