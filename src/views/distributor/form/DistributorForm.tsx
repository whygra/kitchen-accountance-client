import NameInput from './DistributorNameInput';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDishWithIngredientsDTO } from '../../../api/dishes';
import { dishFormContext, distributorFormContext } from '../../../context';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { GetDistributorWithPurchaseOptionsDTO } from '../../../api/distributors';


enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

function DistributorForm() 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<GetDistributorWithPurchaseOptionsDTO|null>(null)

  const {formState, requestFn, setName} = useContext(distributorFormContext);

  async function commit() {
    setState(FormState.WaitingForResponse)
    
    let response: GetDistributorWithPurchaseOptionsDTO | null = await requestFn()
    setResponse(response)
    setState(FormState.ResponseReceived)
  }

  function cancel() {
    navigate(-1)
  }

  return (()=>{switch (state){
    case FormState.FormInput:
      return(<>
        <Form.Group className='mb-3'>
        <Form.Label><b>Название организации</b></Form.Label>
        <NameInput name={formState.name} setName={setName}/>
        </Form.Group>
        <PurchaseOptionFormList/>
        <div className='d-flex'>
          <Button className='me-2' onClick={commit}>Подтвердить</Button>
          <Button className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
    case FormState.WaitingForResponse:
      return(<>Ожидание ответа от сервера...</>)
    case FormState.ResponseReceived:
      return(
        <>
          <p>id: {response?.id}</p>
          <p>name: {response?.name}</p>
        </>
      )
    default:
      return (<>{formState}</>)
  }})()
}

export default DistributorForm