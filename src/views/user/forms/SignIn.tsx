import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/IngredientFormContext';
import { signIn, signUp } from '../../../api/users';
import { setCookie } from '../../../cookies';
import { authContext } from '../../../context/AuthContextProvider';


function SignIn() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {showModal} = useContext(appContext)
  const {updateUserData} = useContext(authContext)

  async function commit() {
    setDisabled(true)
    
    try{
      const res = await signIn({
        id:0,
        name:'',
        email,
        password,
      })

      await updateUserData()
      navigate('/home')
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  return (
      <Container className='pt-5'>
        <Link to='/signup'>Нет учетной записи? создать</Link>
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

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Container>)
}

export default SignIn