import { Button, Container, Form } from 'react-bootstrap';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContextProvider';
import useValidateForm from '../../hooks/useValidateForm';


function SignUp() 
{  
  const {signup} = useContext(authContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  async function commit() {
    await signup({name, email, password, cPassword})
  }  
  
  const navigate = useNavigate()
  function cancel() {
    navigate(-1)
  }
  
  // валидация формы
  const {disabled, validated, handleSubmit} = useValidateForm(commit)

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
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          введите пароль
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label><b>Подтвердить пароль</b></Form.Label>
        <Form.Control
          type='password'
          value={cPassword}
          onChange={(e)=>setCPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          введите пароль
        </Form.Control.Feedback>
      </Form.Group>

      <div className='d-flex'>
        <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
        <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
      </div>
    </Form>)
}

export default SignUp