import NameInput from './DistributorNameInput';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';
import SpreadsheetColumnIdInput from './SpreadsheetColumnIdInput';

export interface ColumnIndex {
    name: string
    viewName: string
    index?: number
}

interface SpreadsheetUploadFormProps {
    columnIndexes: ColumnIndex[]
    onCommit: (file:File, columnIndexes: ColumnIndex[])=>Promise<void>
    onCancel: ()=>void
}

function SpreadsheetUploadForm({columnIndexes: initIndexes, onCommit, onCancel}:SpreadsheetUploadFormProps) 
{
    const [file, setFile] = useState<File>()
    const [columnIndexes, setColumnIndexes] = useState(initIndexes)
    const [disabled, setDisabled] = useState(false)

    function onIndexChanged(data:ColumnIndex){
        setColumnIndexes(columnIndexes.map(c=>c.name==data.name?data:c))
    }

    async function commit(){
        setDisabled(true)
        try{
            if (file==undefined)
                throw(new Error('Нужно выбрать файл'))

            await onCommit(file, columnIndexes)
        }
        catch (error: any){
            console.log(error)
        }
        setDisabled(false)
    }

    function cancel(){
        onCancel()
    }

  return (
    <Container className="pb-1">
        <Row className="pb-5 px-2 pt-2">
            Выберите номера столбцов, в которых располагаются соответствующие данные
        </Row>
        <Row className="pb-5 px-2 pt-2">
            {initIndexes.map((v)=><SpreadsheetColumnIdInput columnIndex={v} onIdChanged={onIndexChanged}/>)}
        </Row>

        <Form.Group>
            <Form.Label>Файл</Form.Label>
            <Form.Control type='file' accept='.xlsx'
                onChange={(e)=>setFile((e.target as HTMLInputElement).files?.[0] ?? undefined)}
            />
        </Form.Group>

        <Row>
            <p className="d-flex justify-content-between">
                {file!=undefined
                    ? <Button disabled={disabled} onClick={commit} variant="primary">Подтвердить</Button>
                    : <></>
                }
                <Button disabled={disabled} onClick={cancel} variant="secondary">Отмена</Button>
            </p>
        </Row>
    </Container>
    )
}

export default SpreadsheetUploadForm