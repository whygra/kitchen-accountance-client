import DishComponentFormList from './DishComponentFormList';
import NameInput from './DishNameInput';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../../../controllers/DishFormController';
import { GetDishWithComponentsDTO } from '../../../api/dishWithComponents';


enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

function DishForm() 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<GetDishWithComponentsDTO|null>(null)

  const {formState, requestFn, setName} = useContext(context);

  function hasComponents() : boolean {
    // есть хотя бы один продукт
    return formState.dishComponentForms.length > 0
  }

  async function commit() {
    if (!hasComponents())
      throw Error("Необходимо выбрать хотя-бы один ингредиент")

    setState(FormState.WaitingForResponse)
    
    let response: GetDishWithComponentsDTO | null = await requestFn()
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
        <Form.Label><b>Название блюда</b></Form.Label>
        <NameInput name={formState.name} setName={setName}/>
        </Form.Group>
        <DishComponentFormList/>
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

export default DishForm