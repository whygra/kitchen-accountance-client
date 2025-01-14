import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContextProvider';
import useValidateForm from '../../hooks/useValidateForm';


function SignIn() 
{  
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login} = useContext(authContext)

  async function commit() {
    await login({
      id:0,
      name:'',
      email,
      password,
    })
  }

  function cancel() {
    navigate(-1)
  }  

  // валидация формы
  const {disabled, validated, handleSubmit} = useValidateForm(commit)

  return (
      <Form className='pt-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className='text-center'>Вход</h3>
        <Link to='/signup'>Нет учетной записи? создать</Link>
        <Form.Group className='mb-4'>
          <Form.Label><b>Email</b></Form.Label>
          <Form.Control
            required
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            введите email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Пароль</b></Form.Label>
          <Form.Control
            required
            min='8'
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            введите пароль длиной не менее 8 символов
          </Form.Control.Feedback>
        </Form.Group>

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        <Link to='/forgot-password'>Забыли пароль?</Link>
      </Form>)
}

export default SignIn