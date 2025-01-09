import { Button, Container, Form } from 'react-bootstrap';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
import { setCookie } from '../../../cookies';
import { ErrorView } from '../../ErrorView';
import { signUp } from '../../../api/auth';


function SignUp() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  const {showModal} = useContext(appContext)

  async function commit() {
    setDisabled(true)
    
    try{
      if(!passwordsMatch())
        throw new Error('Пароли не совпадают')
      const res = await signUp({
        id:0,
        name,
        email,
        password,
      })
      
      navigate('/')
      showModal(<>{res?.message}</>)
    }
    catch (error: Error | any) {
      showModal(<div className='p-2 text-center'><ErrorView error={error}/></div>, <b>{error.name}</b>)
    }
  }

  function passwordsMatch(){
    return password.localeCompare(cPassword) == 0
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
    <Form className='pb-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-4'>
            <Form.Label><b>Имя пользователя</b></Form.Label>
            <Form.Control
            type='text'
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Email</b></Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Пароль</b></Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Подтвердить пароль</b></Form.Label>
          <Form.Control
            type='password'
            value={cPassword}
            onChange={(e)=>setCPassword(e.target.value)}
          />
        </Form.Group>

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Form>)
}

export default SignUp