import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/IngredientFormContext';
import { signUp } from '../../../api/users';
import { setCookie } from '../../../cookies';
import { ErrorView } from '../../ErrorView';


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
      navigate(-1)
    }
    catch (error: Error | any) {
      showModal(<ErrorView error={error}/>)
      setDisabled(false)
    }
  }

  function passwordsMatch(){
    return password.localeCompare(cPassword) == 0
  }

  function cancel() {
    navigate(-1)
  }

  return (
      <Container className='pt-5'>
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
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Container>)
}

export default SignUp