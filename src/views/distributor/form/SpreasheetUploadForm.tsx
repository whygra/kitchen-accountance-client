import NameInput from './DistributorNameInput';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
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
    const [errorMsg, setErrorMsg] = useState<string>()
    const {showModal} = useContext(appContext)
    const [file, setFile] = useState<File>()
    const [columnIndexes, setColumnIndexes] = useState(initIndexes)
    const [disabled, setDisabled] = useState(false)

    function onIndexChanged(data:ColumnIndex){
        setColumnIndexes(columnIndexes.map(c=>c.name==data.name?data:c))
    }

    async function commit(){
        setErrorMsg(undefined)
        setDisabled(true)
        try{
            if (file==undefined)
                throw(new Error('Нужно выбрать файл'))

            await onCommit(file, columnIndexes)
        }
        catch (error: any){
            setErrorMsg(error.message)
        }
        setDisabled(false)
    }

    function cancel(){
        onCancel()
    }
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event:FormEvent) => {
      event.preventDefault();
      
      const form = event.currentTarget as any;
      if (form.checkValidity() === false) {
        event.stopPropagation();      
        setValidated(true);
        return
      }
  
      commit()
    };

    
    const indexesAreUnique = columnIndexes.filter(
        (value, index, self)=>
            !value.index
            || self.findIndex(i=>i.index==value.index)==index
    ).length == columnIndexes.length

  return (
    <Container className="pb-1">
        <Form aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-2 px-2 pt-2">
            {initIndexes.map((v)=><SpreadsheetColumnIdInput columnIndex={v} onIdChanged={onIndexChanged}/>)}
        </Row>

        <Form.Group className='mb-4'>
            <Form.Label>Файл</Form.Label>
            <Form.Control type='file' accept='.xlsx'
                onChange={(e)=>setFile((e.target as HTMLInputElement).files?.[0] ?? undefined)}
            />
        </Form.Group>
        <Row className='text-danger px-3'>
            {indexesAreUnique
                ?''
                :'Номера столбцов не могут повторяться'
            }
        </Row>
        <Row>
            <p className="d-flex justify-content-between">
                <Button disabled={disabled || !file} type='submit' variant="primary">Подтвердить</Button>
                <Button disabled={disabled} onClick={cancel} variant="secondary">Отмена</Button>
            </p>
        </Row>
        </Form>
    </Container>
    )
}

export default SpreadsheetUploadForm