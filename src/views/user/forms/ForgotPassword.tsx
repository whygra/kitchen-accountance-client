import { Button, Container, Form } from 'react-bootstrap';
import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
import { forgotPassword, signIn, signUp } from '../../../api/auth';
import { setCookie } from '../../../cookies';
import { authContext } from '../../../context/AuthContextProvider';
import { ErrorView } from '../../ErrorView';


function ForgotPassword() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const [email, setEmail] = useState('')

  const {showModal} = useContext(appContext)

  async function commit() {
    setDisabled(true)
    
    try{
      const res = await forgotPassword(email)
      showModal(<>{res?.message}</>)
      navigate('/home')
    }
    catch (error: Error | any) {
      showModal(<div className='p-2 text-center'><ErrorView error={error}/></div>, <b>{error.name}</b>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
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
      <Container className='pt-5'>
        <h3 className='text-center'>Сброс пароля</h3>
        <Link to='/signup'>Нет учетной записи? создать</Link>
        <Form.Group className='mb-4'>
          <Form.Label><b>Введите адрес email, на который зарегистрированна учетная запись</b></Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Container>)
}

export default ForgotPassword