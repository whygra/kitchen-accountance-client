import ComponentProductFormList from './ComponentProductFormList';
import NameInput from './ComponentNameInput';
import ComponentTypeSelect from './ComponentTypeSelect';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { ComponentDTO } from '../../../api/components';
import { useNavigate } from 'react-router-dom';
import { ComponentFormState, ComponentProductFormState } from '../../../models/component';
import { addComponentProductForm } from '../../../redux/actions/comoponentFormActions';

enum FormState{
  FormInput,
  WaitingForResponse,
  ResponseReceived,
}

interface ComponentFormProps{
  castToValidPercentages: ()=>void
  addComponentProductForm: ()=>void
  setComponentProductFormState: (state:ComponentProductFormState)=>void
  removeComponentProductForm: (key:string)=>void
  formState: ComponentFormState
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  request: ()=>Promise<ComponentDTO | null>
}

function ComponentForm({castToValidPercentages, addComponentProductForm, setComponentProductFormState, removeComponentProductForm, formState, setTypeId, setName, request}: ComponentFormProps) 
{  
  const navigate = useNavigate()

  const [state, setState] = useState(FormState.FormInput)
  const [response, setResponse] = useState<ComponentDTO|null>(null)

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
    
    let response: ComponentDTO | null = await request()
    setResponse(response)
    setState(FormState.ResponseReceived)
  }

  function cancel() {
    navigate(-1)
  }

  return (()=>{switch (state){
    case FormState.FormInput:
      return(<>
        <NameInput
          name={formState.name}
          handleNameChange={setName}
        />
        <ComponentTypeSelect
          componentTypeId={formState.componentTypeId}
          handleComponentTypeChange={setTypeId}
        />
        <ComponentProductFormList 
        setComponentProductFormState={setComponentProductFormState}
        castToValidPercentages={castToValidPercentages}
        addComponentProductForm={addComponentProductForm}
        removeComponentProductForm={removeComponentProductForm}
        forms={formState.componentProductForms} />
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

export default ComponentForm