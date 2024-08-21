import NameInput from './DistributorNameInput';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishWithIngredientsDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';



function DistributorForm() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const {showModal} = useContext(appContext)

  const {formState, requestFn, setName} = useContext(distributorFormContext);

  async function commit() {
    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/distributors/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  return (<>
        <Form.Group className='mb-3'>
        <Form.Label><b>Название организации</b></Form.Label>
        <NameInput name={formState.name} setName={setName}/>
        </Form.Group>
        <PurchaseOptionFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default DistributorForm