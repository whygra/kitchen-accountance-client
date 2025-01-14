import { Button, Container, Form, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import { distributorFormContext } from '../../../context/forms/distributor/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';

export interface ColumnIndex {
    name: string
    viewName: string
    index?: number
}

interface SpreadsheetUploadFormProps {
    onCommit: (file:File)=>Promise<void>
    onCancel: ()=>void
}

function SpreadsheetUploadForm({onCommit, onCancel}:SpreadsheetUploadFormProps) 
{
    const [errorMsg, setErrorMsg] = useState<string>()
    const {showModal} = useContext(appContext)
    const [file, setFile] = useState<File>()
    const [disabled, setDisabled] = useState(false)

    async function commit(){
        setErrorMsg(undefined)
        setDisabled(true)
        try{
            if (file==undefined)
                throw(new Error('Нужно выбрать файл'))

            await onCommit(file)
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

  return (
    <Container className="pb-1">
        <Form aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className='mb-4'>
            <Form.Label>Файл</Form.Label>
            <Form.Control type='file' accept='.xlsx'
                onChange={(e)=>setFile((e.target as HTMLInputElement).files?.[0] ?? undefined)}
            />
        </Form.Group>
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