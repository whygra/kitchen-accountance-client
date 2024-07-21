import ComponentProductFormList from './ComponentProductFormList';
import NameInput from './ComponentNameInput';
import ComponentTypeSelect from './ComponentTypeSelect';
import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { ComponentDTO } from '../../../api/components';
import { useNavigate } from 'react-router-dom';
import { ComponentFormState, ComponentProductFormState } from '../../../models/ComponentFormState';
import { addComponentProductForm } from '../../../redux/actions/comoponentFormActions';
import { context } from '../../../controllers/ComponentFormController';
import { GetComponentWithProductsDTO } from '../../../api/componentWithProducts';


enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

function ComponentForm() 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<GetComponentWithProductsDTO|null>(null)

  const {formState, requestFn, setName, setTypeId, componentTypes} = useContext(context);

  function contentPercentagesAreValid() : boolean {
    const contentPercentageSum = 
    formState.componentProductForms
    .reduce((sum, current) => sum + current.rawContentPercentage, 0);
    // сумма процентов содержания == 100
    return contentPercentageSum == 100.
  }

  function hasProducts() : boolean {
    // есть хотя бы один продукт
    return formState.componentProductForms.length > 0
  }

  async function commit() {
    if (!contentPercentagesAreValid())
      throw Error("Сумма процентов содержания должна равняться 100")
    if (!hasProducts())
      throw Error("Необходимо выбрать хотя-бы один продукт")

    setState(FormState.WaitingForResponse)
    
    let response: GetComponentWithProductsDTO | null = await requestFn()
    setResponse(response)
    setState(FormState.ResponseReceived)
  }

  function cancel() {
    navigate(-1)
  }

  return (()=>{switch (state){
    case FormState.FormInput:
      return(<div className='pt-5'>
        <Form.Group className='mb-4'>
          <Form.Label><b>Название ингредиента</b></Form.Label>
          <NameInput name={formState.name} setName={setName}/>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label><b>Тип ингредиента</b></Form.Label>
          <ComponentTypeSelect componentTypes={componentTypes} typeId={formState.componentTypeId} setTypeId={setTypeId}/>
        </Form.Group>
        <ComponentProductFormList/>
        <div className='d-flex'>
          <Button className='me-2' onClick={commit}>Подтвердить</Button>
          <Button className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </div>)
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

export default ComponentForm