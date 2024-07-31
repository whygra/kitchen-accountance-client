import DishIngredientFormList from './DishIngredientFormList';
import NameInput from './DishNameInput';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDishWithIngredientsDTO } from '../../../api/dishWithIngredients';
import { dishFormContext } from '../../../context';


enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

function DishForm() 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<GetDishWithIngredientsDTO|null>(null)

  const {formState, requestFn, setName} = useContext(dishFormContext);

  function hasIngredients() : boolean {
    // есть хотя бы один продукт
    return formState.dishIngredientForms.length > 0
  }

  async function commit() {
    if (!hasIngredients())
      throw Error("Необходимо выбрать хотя-бы один ингредиент")

    setState(FormState.WaitingForResponse)
    
    let response: GetDishWithIngredientsDTO | null = await requestFn()
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
        <DishIngredientFormList/>
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