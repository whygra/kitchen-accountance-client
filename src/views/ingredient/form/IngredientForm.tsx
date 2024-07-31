import IngredientProductFormList from './IngredientProductFormList';
import NameInput from './IngredientNameInput';
import IngredientTypeSelect from './IngredientTypeSelect';
import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { IngredientDTO } from '../../../api/ingredients';
import { useNavigate } from 'react-router-dom';
import { IngredientFormState, IngredientProductFormState } from '../../../models/IngredientFormState';
import { addIngredientProductForm } from '../../../redux/actions/ingredientFormActions';
import { ingredientContext } from '../../../context';
import { GetIngredientWithProductsDTO } from '../../../api/ingredientWithProducts';


enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

function IngredientForm() 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<GetIngredientWithProductsDTO|null>(null)

  const {formState, requestFn, setName, setTypeId, ingredientTypes} = useContext(ingredientContext);

  function contentPercentagesAreValid() : boolean {
    const contentPercentageSum = 
    formState.ingredientProductForms
    .reduce((sum, current) => sum + current.rawContentPercentage, 0);
    // сумма процентов содержания == 100
    return contentPercentageSum == 100.
  }

  function hasProducts() : boolean {
    // есть хотя бы один продукт
    return formState.ingredientProductForms.length > 0
  }

  async function commit() {
    if (!contentPercentagesAreValid())
      throw Error("Сумма процентов содержания должна равняться 100")
    if (!hasProducts())
      throw Error("Необходимо выбрать хотя-бы один продукт")

    setState(FormState.WaitingForResponse)
    
    let response: GetIngredientWithProductsDTO | null = await requestFn()
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
          <IngredientTypeSelect ingredientTypes={ingredientTypes} typeId={formState.ingredientTypeId} setTypeId={setTypeId}/>
        </Form.Group>
        <IngredientProductFormList/>
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

export default IngredientForm